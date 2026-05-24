# `/contact` — Trang liên hệ

## 1. Mục tiêu trang

| Mục tiêu            | Mô tả                                                     |
| ------------------- | --------------------------------------------------------- |
| Thu lead            | Lấy thông tin người quan tâm khóa học                     |
| Tư vấn khóa phù hợp | Biết người dùng cần workshop, bootcamp, mentoring hay B2B |
| Tạo kênh liên hệ    | Cho người dùng biết cách liên hệ CORTEX                   |

---

# 2. Bố cục trang đề xuất

```text
/contact

1. Header ngắn
2. Contact Form
3. Contact Info
4. Success Message
```

---

# 3. Section 1 — Header

| Thành phần | Yêu cầu                                                                     |
| ---------- | --------------------------------------------------------------------------- |
| Title      | `Liên hệ CORTEX`                                                            |
| Subtitle   | “Để lại thông tin, CORTEX sẽ tư vấn khóa học phù hợp với mục tiêu của bạn.” |

---

# 4. Section 2 — Contact Form

Form nên có các field sau:

| Field              | Bắt buộc | Ghi chú              |
| ------------------ | -------- | -------------------- |
| Họ và tên          | Có       | Text input           |
| Email              | Có       | Validate email       |
| Số điện thoại/Zalo | Có       | Dùng để tư vấn nhanh |
| Nhu cầu quan tâm   | Có       | Dropdown             |
| Ghi chú            | Không    | Textarea ngắn        |

Dropdown **Nhu cầu quan tâm** nên gồm:

```text
- Workshop miễn phí
- Starter mini course
- AI Agent & Vibe Coding Bootcamp
- Advanced AI Agent Automation
- Mentoring 1:1 / Portfolio coaching
- B2B training cho team/club/SME
- Chưa biết, cần tư vấn
```

CTA:

```text
Gửi thông tin tư vấn
```

---

# 5. Section 3 — Contact Info

Hiển thị gọn bên cạnh hoặc dưới form:

| Thông tin          | Nội dung                             |
| ------------------ | ------------------------------------ |
| Email              | Email chính thức của CORTEX          |
| Zalo/Phone         | Số liên hệ tư vấn                    |
| Social             | Facebook / LinkedIn / YouTube nếu có |
| Thời gian phản hồi | Ví dụ: “Phản hồi trong 24–48 giờ”    |

---

# 6. Sau khi gửi form

Khi gửi thành công, hiển thị:

```text
Cảm ơn bạn! CORTEX đã nhận thông tin và sẽ liên hệ tư vấn sớm.
```

Dữ liệu lưu vào bảng `leads`.

---

# 7. Yêu cầu chức năng

| Nhóm          | Yêu cầu                                                 |
| ------------- | ------------------------------------------------------- |
| Submit form   | Lưu lead vào database                                   |
| Validation    | Không cho gửi nếu thiếu tên, email, phone/Zalo, nhu cầu |
| Lead source   | Lưu nguồn là `contact_page`                             |
| Lead status   | Mặc định là `new`                                       |
| Success state | Hiển thị thông báo gửi thành công                       |
| Error state   | Báo lỗi nếu gửi thất bại                                |
| Responsive    | Mobile form 1 cột, desktop có thể 2 cột                 |

---

# 8. Data cần lưu vào `leads`

| Field        | Nội dung           |
| ------------ | ------------------ |
| `full_name`  | Họ tên             |
| `email`      | Email              |
| `phone`      | Số điện thoại/Zalo |
| `interest`   | Nhu cầu quan tâm   |
| `message`    | Ghi chú            |
| `source`     | contact_page       |
| `status`     | new                |
| `created_at` | Thời gian gửi      |

---

Trang này nên **cực kỳ rõ và ít phân tâm**: người dùng vào là biết cần điền form để được tư vấn.
