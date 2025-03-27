<script setup lang="ts">
const { status, data, signIn } = useAuth();
const { getErrors, getError, hasErrors, handleApiError, removeError } = useFormValidation();

const initialValues = reactive({
  email: "",
  password: "",
  remember: false,
});

// Handle form submission
const onFormSubmit = async () => {
  // clearErrors(FORM_NAMESPACE);
  removeError("email");
  try {
    await signIn({
      email: initialValues.email,
      password: initialValues.password,
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Helper computed properties for template
const generalErrors = computed(() => getErrors("general") || []);
</script>

<template>
  <div>
    <div>You are currently {{ status }}.</div>
    <div v-if="data">
      You are logged in
      <pre>{{ data }}</pre>
    </div>
    <div v-else>You are not logged in.</div>

    <h1>{{ $t("hello") }}</h1>
    <p>{{ $t("welcome") }}</p>

    <Form :initial-values="initialValues" class="flex flex-col gap-4 w-full sm:w-56" @submit="onFormSubmit">
      <!-- Global error message -->
      <Message v-if="generalErrors.length" severity="error" size="small" variant="simple">
        {{ generalErrors[0] }}
      </Message>

      <div class="flex flex-col gap-1">
        <!-- Email Field -->
        <FormField name="email" class="flex flex-col gap-1">
          <InputText
            v-model="initialValues.email"
            placeholder="you@example.com"
            type="email"
            class="w-full"
            :class="{ 'p-invalid': hasErrors('email') }"
          />
          <Message v-if="hasErrors('email')" severity="error" size="small" variant="simple">
            {{ getError("email") }}
          </Message>
        </FormField>

        <!-- Password Field -->
        <FormField name="password" class="flex flex-col gap-1">
          <InputText
            v-model="initialValues.password"
            type="password"
            class="w-full"
            :class="{ 'p-invalid': hasErrors('password') }"
          />
          <Message v-if="hasErrors('password')" severity="error" size="small" variant="simple">
            {{ getError("password") }}
          </Message>
        </FormField>
      </div>

      <div class="flex items-center justify-end space-x-4">
        <!--        <NuxtLink class="text-sm" to="/auth/forgot">Forgot your password?</NuxtLink>-->
        <Button type="submit" label="Login" />
      </div>
    </Form>
  </div>
</template>

<style scoped></style>
