export const UserStatus = Object.freeze({
  CREATED: 'created',
  EMAIL_VERIFIED: 'email_verified',
  DATA_UPLOAD: 'data_upload',
  AUNTENTIFIED: 'autentified',
  COMPLETED: 'completed'
})

export const formatUserStatus = (status: string | null): string => {
  switch (status) {
    case UserStatus.CREATED:
      return 'Creado'
    case UserStatus.EMAIL_VERIFIED:
      return 'Email verificado'
    case UserStatus.DATA_UPLOAD:
      return 'Información personal adjuntada'
    case UserStatus.AUNTENTIFIED:
      return 'Autentificado biométricamente'
    case UserStatus.COMPLETED:
      return 'Completado'
    default:
      return 'No se pudo determinar el estado de su cuenta.'
  }
}

export const getUserStatusStep = (status: string | null): number => {
  switch (status) {
    case UserStatus.CREATED:
      return 1
    case UserStatus.EMAIL_VERIFIED:
      return 2
    case UserStatus.DATA_UPLOAD:
      return 3
    case UserStatus.AUNTENTIFIED:
      return 4
    case UserStatus.COMPLETED:
      return 5
    default:
      return 0
  }
}
