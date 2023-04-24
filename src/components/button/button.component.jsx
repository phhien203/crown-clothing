import {
  BaseButton,
  GoogleButton,
  InvertedButton,
  SpinnerButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASS = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

function getButton(buttonType = BUTTON_TYPE_CLASS.base) {
  return {
    [BUTTON_TYPE_CLASS.base]: BaseButton,
    [BUTTON_TYPE_CLASS.google]: GoogleButton,
    [BUTTON_TYPE_CLASS.inverted]: InvertedButton,
  }[buttonType];
}

export default function Button({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton
      disabled={isLoading}
      className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? <SpinnerButton /> : children}
    </CustomButton>
  );
}
