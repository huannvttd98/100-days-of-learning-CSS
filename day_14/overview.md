# Giải thích turn.js - Thư viện Flip Trang

## Giới thiệu
**turn.js** là một thư viện jQuery chuyên dụng để tạo hiệu ứng lật trang (page flip) giống như cuốn sách thực tế. Nó hỗ trợ cả touch và mouse, và cung cấp hiệu ứng 3D với gradient động.

---

## Cấu trúc chính

### 1. **Định nghĩa biến và hằng số**
```javascript
- isTouch: Kiểm tra thiết bị hỗ trợ touch hay không
- events: Xác định loại sự kiện (touchstart/mousedown, touchmove/mousemove, touchend/mouseup)
- corners: Xác định các góc của trang (tl, tr, bl, br)
- displays: Chế độ hiển thị (single, double)
```

### 2. **Các tùy chọn mặc định**

#### turnOptions (Cấu hình của cuốn sách)
- `page`: Trang hiện tại
- `duration`: Thời gian lật trang (ms) - mặc định 600ms
- `gradients`: Bật/tắt gradient (hiệu ứng bóng)
- `acceleration`: Bật tăng tốc phần cứng
- `display`: Chế độ hiển thị (single hoặc double)

#### flipOptions (Cấu hình của hành động lật)
- `corners`: Góc kích hoạt (backward, forward, all)
- `cornerSize`: Kích thước vùng nhạy cảm của góc (pixels)
- `duration`: Thời gian chuyển động

---

## Các hàm chính

### Hàm tiện ích
| Hàm | Chức năng |
|-----|----------|
| `divAtt()` | Tạo thuộc tính div với vị trí và z-index |
| `bezier()` | Tính toán đường cong Bezier cho chuyển động mượt |
| `rad()` / `deg()` | Chuyển đổi giữa radian và độ |
| `point2D()` | Tạo điểm 2D với tọa độ x, y |
| `translate()` | Tạo CSS transform translate |
| `rotate()` | Tạo CSS transform rotate |
| `gradient()` | Tạo gradient tuyến tính cho hiệu ứng bóng |

### Phương thức chính (turnMethods)

#### **init(opts)**
- Khởi tạo cuốn sách
- Thiết lập event listener cho mouse/touch
- Gắn các sự kiện: touchstart/mousedown, touchmove/mousemove, touchend/mouseup

#### **addPage(element, page)**
- Thêm một trang mới vào cuốn sách
- Tạo các element cần thiết cho hiệu ứng flip

#### **_makeFlip(page)**
- Tạo hiệu ứng lật cho một trang
- Xử lý xoay, dịch chuyển và gradient

#### **_setPageLoc(page)**
- Xác định vị trí trang (trái hay phải)
- Trả về 0 (trái) hoặc 1 (phải)

#### **_pressed()**
- Xử lý khi người dùng nhấn vào trang

---

## Quy trình hoạt động

### 1. **Khởi tạo**
```
init() → Tạo các page elements → Gắn event listeners
```

### 2. **Người dùng tương tác**
```
Nhấn/Touch (start event)
    ↓
Kiểm tra nếu nhấn vào vùng góc (cornerSize)
    ↓
Bắt đầu lắng nghe chuyển động (move event)
```

### 3. **Lật trang**
```
Theo dõi chuyển động của chuột/ngón tay
    ↓
Tính toán góc lật (0° → 180°)
    ↓
Cập nhật CSS 3D transform
    ↓
Vẽ gradient bóng động
```

### 4. **Kết thúc**
```
Thả chuột/ngón tay (end event)
    ↓
Quyết định: Lật hoàn thành hay quay lại
    ↓
Chạy animation tới vị trí cuối cùng
    ↓
Kích hoạt callback sự kiện
```

---

## Hiệu ứng chính

### **3D Transform**
- Sử dụng `perspective`, `rotateX`, `rotateY`, `rotateZ`
- Tạo ảo giác lật trang 3D thực tế

### **Gradient Động**
- Tạo bóng từ đen đến trong suốt
- Tạo độ sâu và chiều sâu cho hiệu ứng

### **Bezier Animation**
- Chuyển động mượt bằng đường cong Bezier
- Tạo cảm giác tự nhiên khi lật trang

---

## Sự kiện (Events)

| Sự kiện | Kích hoạt khi |
|---------|--------------|
| `start` | Người dùng bắt đầu tương tác |
| `move` | Người dùng di chuyển chuột/ngón tay |
| `end` | Người dùng thả chuột/ngón tay |
| `turned` | Trang đã lật thành công |
| `turning` | Đang quá trình lật trang |

---

## Ví dụ sử dụng cơ bản

```javascript
// Khởi tạo cuốn sách
$('.book').turn({
  width: 800,
  height: 600,
  duration: 600,
  display: 'double',
  gradients: true,
  acceleration: true
});

// Thêm trang
$('.book').turn('addPage', $('<div></div>'), 1);

// Lắng nghe sự kiện
$('.book').bind('turned', function(e, page) {
  console.log('Trang hiện tại:', page);
});
```

---

## Tóm tắt
Turn.js là một thư viện mạnh mẽ cho phép tạo trải nghiệm lật trang tương tác, giống như đọc sách thực. Nó kết hợp CSS 3D, JavaScript events, và gradient dynamics để tạo hiệu ứng thực tế, hỗ trợ cả desktop (mouse) lẫn mobile (touch).
