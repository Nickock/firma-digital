const UserStatus = Object.freeze({
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
      return 'Datos personales'
    case UserStatus.AUNTENTIFIED:
      return 'Autentificado'
    case UserStatus.COMPLETED:
      return 'Firma activa'
    default:
      return 'No se pudo determinar el estado de su cuenta.'
  }
}

export const formatUserStatusColor = (status: string | null): string => {
  switch (status) {
    case UserStatus.CREATED:
      return '#E82727'
    case UserStatus.EMAIL_VERIFIED:
      return '#C9E827'
    case UserStatus.DATA_UPLOAD:
      return '#A127E8'
    case UserStatus.AUNTENTIFIED:
      return '#7727E8'
    case UserStatus.COMPLETED:
      return '#27E8D1'
    default:
      return 'white'
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
