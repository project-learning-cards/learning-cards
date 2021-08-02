export const emailValidation = (value: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
}

export const nickNameValidation = (value: string) => {
  return /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/i.test(
    value
  )
}

export const PasswordValidation = (value: string) => {
  return /[0-9a-zA-Z!@#$%^&*]{8,}/.test(value)
}

export const urlAvatarValidation = (value: string) => {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
    value
  )
}
