import { RequestStatus } from "../infrastructure/models/student"

function requestStatusDisplay(status: RequestStatus): string {
  switch (status) {
    case RequestStatus.NEW:
      return "Mới";
    case RequestStatus.PROCESSING:
      return "Đang dạy";
    case RequestStatus.STOP:
      return "Tạm dừng";
    case RequestStatus.END:
      return "Xong";
  }
}
export { requestStatusDisplay }
