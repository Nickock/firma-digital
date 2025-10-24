export default function apiResponse(success: boolean, payload: object) {
  return { success: success, payload: payload }
}
