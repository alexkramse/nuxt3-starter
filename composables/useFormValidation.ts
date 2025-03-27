import { reactive } from "vue";

interface ValidationErrors {
  [namespace: string]: {
    [field: string]: string[];
  };
}

const DEFAULT_NAMESPACE = "default";

// Shared reactive state
const errors = reactive<ValidationErrors>({});

export const useFormValidation = () => {
  const setErrors = (validationErrors: Record<string, string[]>, namespace: string = DEFAULT_NAMESPACE) => {
    errors[namespace] = { ...validationErrors };
  };

  const removeError = (keys: string | string[], namespace: string = DEFAULT_NAMESPACE) => {
    if (!errors[namespace]) return;

    const removeKey = (key: string) => {
      if (key.endsWith(".*")) {
        const prefix = key.slice(0, -2);
        const namespaceErrors = errors[namespace]!;
        Object.keys(namespaceErrors).forEach((errorKey) => {
          if (errorKey.startsWith(prefix)) {
            Reflect.deleteProperty(namespaceErrors, errorKey);
          }
        });
      } else if (key in errors[namespace]!) {
        Reflect.deleteProperty(errors[namespace]!, key);
      }
    };

    if (Array.isArray(keys)) {
      keys.forEach(removeKey);
    } else {
      removeKey(keys);
    }

    if (Object.keys(errors[namespace]!).length === 0) {
      Reflect.deleteProperty(errors, namespace);
    }
  };

  const clearErrors = (namespace: string = DEFAULT_NAMESPACE) => {
    Reflect.deleteProperty(errors, namespace);
  };

  const clearAllErrors = () => {
    Object.keys(errors).forEach((key) => Reflect.deleteProperty(errors, key));
  };

  const getErrors = (field?: string, namespace: string = DEFAULT_NAMESPACE): string[] => {
    if (!errors[namespace]) {
      return [];
    }

    if (field) {
      return errors[namespace][field] || [];
    }

    return Object.values(errors[namespace]).flat();
  };

  const getError = (field?: string, namespace: string = DEFAULT_NAMESPACE): string => {
    const errs = getErrors(field, namespace);
    return errs[0] || "";
  };

  const hasErrors = (field?: string, namespace: string = DEFAULT_NAMESPACE) => {
    if (field) {
      return !!errors[namespace]?.[field];
    }
    return !!errors[namespace] && Object.keys(errors[namespace]).length > 0;
  };

  // TODO: refactor required
  // interface ErrorResponse {
  //   response?: {
  //     status: number;
  //     data: {
  //       errors: Record<string, string[]>;
  //     };
  //   };
  //   status?: number;
  //   message?: string;
  //   data?: {
  //     errors: Record<string, string[]>;
  //   };
  // }

  const handleApiError = (error, namespace: string = DEFAULT_NAMESPACE) => {
    if (error.response?.status === 422 || error.status === 422) {
      const validationErrors = error.response?.data?.errors || error.data?.errors || {};
      setErrors(validationErrors, namespace);
      // if (error.message) {
      // Handle general errors
      // setErrors({ general: [error.message] }, namespace);
      // }
      return;
    }
    throw error;
  };

  return {
    // Error state
    errors,

    // Error management methods
    setErrors,
    removeError,
    clearErrors,
    clearAllErrors,
    getErrors,
    getError,
    hasErrors,

    // API error handling
    handleApiError,

    // Constants
    DEFAULT_NAMESPACE,
  };
};
