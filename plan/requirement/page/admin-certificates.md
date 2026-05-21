# `/admin/certificates` Quản lý chứng chỉ

**Mục tiêu:** cấp và kiểm soát certificate.

| Khu vực           | Nên làm như nào                                       |
| ----------------- | ----------------------------------------------------- |
| Certificate table | Certificate ID, học viên, khóa, ngày cấp, trạng thái. |
| Issue certificate | Chọn học viên + khóa đủ điều kiện để cấp.             |
| PDF generation    | Tạo file certificate từ template.                     |
| Actions           | View, download, revoke, copy verify link.             |

**Rule:** Certificate ID phải unique, không trùng.
