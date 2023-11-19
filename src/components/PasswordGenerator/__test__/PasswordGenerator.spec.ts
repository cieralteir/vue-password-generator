import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import PasswordGenerator from "@/components/PasswordGenerator/PasswordGenerator.vue";

describe("Password Generator", () => {
  test("mountes properly", () => {
    const wrapper = mount(PasswordGenerator);
    expect(wrapper.text()).toContain("Password Generator");
  });

  test("generates password", async () => {
    const wrapper = mount(PasswordGenerator);
    await wrapper.find("#generate-password").trigger("click");
    expect(wrapper.find("#generated-password").text()).toBeTruthy();
  });

  test("generates password with 10 length", async () => {
    const wrapper = mount(PasswordGenerator);
    await wrapper.find("[name='character-length']").setValue(10);
    expect(wrapper.find("#character-length").text()).toBe("10");
    await wrapper.find("#generate-password").trigger("click");
    expect(wrapper.find("#generated-password").text()).toHaveLength(10);
  });

  test("generates strong password", async () => {
    const wrapper = mount(PasswordGenerator);
    await wrapper.find("[name='include-uppercase-letters']").setValue();
    await wrapper.find("[name='include-lowercase-letters']").setValue();
    await wrapper.find("[name='include-numbers']").setValue();
    await wrapper.find("[name='include-symbols']").setValue();
    await wrapper.find("#generate-password").trigger("click");
    const elemPasswordStrength = wrapper.find(
      "[data-test='password-strength']"
    );
    expect(elemPasswordStrength.exists()).toBe(true);
    expect(elemPasswordStrength.text()).toBe("STRONG");
    expect(wrapper.findAll("[data-test='password-strength-bar']").length).toBe(
      4
    );
  });
});
