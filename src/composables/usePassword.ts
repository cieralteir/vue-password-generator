import { computed, ref } from "vue";

interface PasswordOptions {
  length?: number;
  includeUppercaseLetters?: boolean;
  includeLowercaseLetters?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
}

export function usePassword(options: PasswordOptions) {
  const password = ref<string>("");
  const passwordStrength = ref<number>(0);
  const passwordStrengthLabel = computed<string>(() => {
    const labels = {
      1: "WEAK",
      2: "MEDIUM",
      3: "MEDIUM",
      4: "STRONG",
    };
    return labels[passwordStrength.value as keyof typeof labels];
  });

  function generatePassword() {
    let generatedPassword = "";

    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()=+_-";

    if (options.includeUppercaseLetters) {
      generatedPassword += getRandomChar(uppercaseLetters);
    }
    if (options.includeLowercaseLetters) {
      generatedPassword += getRandomChar(lowercaseLetters);
    }
    if (options.includeNumbers) {
      generatedPassword += getRandomChar(numbers);
    }
    if (options.includeSymbols) {
      generatedPassword += getRandomChar(symbols);
    }

    // Generate remaining
    const charset = uppercaseLetters + lowercaseLetters + numbers + symbols;
    for (let i = generatePassword.length; i < (options.length || 0); i++) {
      generatedPassword += getRandomChar(charset);
    }

    // Shuffle
    generatedPassword = generatedPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    password.value = generatedPassword;

    checkPasswordStrength();
  }

  function getRandomChar(charset: string): string {
    const randomIndex = Math.floor(Math.random() * charset.length);
    return charset.charAt(randomIndex);
  }

  function checkPasswordStrength(): void {
    let strength = 0;

    if (/[A-Z]/.test(password.value)) {
      strength++;
    }
    if (/[a-z]/.test(password.value)) {
      strength++;
    }
    if (/\d/.test(password.value)) {
      strength++;
    }
    if (/[!@#$%^&*()=+_-]/.test(password.value)) {
      strength++;
    }

    passwordStrength.value = strength;
  }

  return {
    password,
    passwordStrength,
    passwordStrengthLabel,
    generatePassword,
  };
}
