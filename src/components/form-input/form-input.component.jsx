import { FormInputLabel, Group, Input } from "./form-input.styles";

export default function FormInput({ label, ...otherProps }) {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel isShrink={!!otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}
