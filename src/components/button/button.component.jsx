import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";

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

export default function Button({ children, buttonType, ...otherProps }) {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton
      className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`}
      {...otherProps}
    >
      {children}
    </CustomButton>
  );
}
