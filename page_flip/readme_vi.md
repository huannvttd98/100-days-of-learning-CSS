# Giải thích mã nguồn: Hiệu ứng Lật Trang 3D (Page Curl)

File `script.js` thực hiện hiệu ứng lật trang giấy 3D tương tác sử dụng thư viện **Three.js**. Dưới đây là giải thích chi tiết về cách hoạt động của các thành phần chính.

## 1. Khởi tạo môi trường 3D (Setup)
*   **Scene**: Tạo không gian 3D với màu nền xám tối.
*   **Camera**: Sử dụng `PerspectiveCamera` để tạo góc nhìn phối cảnh thực tế. Camera được đặt ở vị trí Z=50 để nhìn thẳng vào trang giấy.
*   **Renderer**: `WebGLRenderer` chịu trách nhiệm hiển thị hình ảnh lên thẻ `div#canvas-container`. Bật đổ bóng (`shadowMap`) để tăng tính chân thực.
*   **Ánh sáng (Lighting)**:
    *   `AmbientLight`: Ánh sáng môi trường nhẹ nhàng.
    *   `DirectionalLight`: Ánh sáng có hướng tạo bóng đổ, giúp hiệu ứng 3D rõ nét hơn.

## 2. Tạo Trang Giấy (Geometry & Materials)
*   **Hình học (Geometry)**: Sử dụng `PlaneGeometry` để tạo một mặt phẳng hình chữ nhật.
    *   Quan trọng: Mặt phẳng được chia thành lưới dày đặc (`SEGMENTS_X = 50`, `SEGMENTS_Y = 50`). Việc có nhiều đỉnh (vertices) là cần thiết để có thể uốn cong mềm mại bề mặt giấy.
*   **Texture (Kết cấu)**: Hàm `createPageTexture` sử dụng HTML Canvas 2D để vẽ nội dung trang giấy (màu nền, dòng kẻ, chữ) ngay trong bộ nhớ, sau đó chuyển thành Texture cho Three.js.
    *   Mặt trước (`frontTexture`): Màu trắng.
    *   Mặt sau (`backTexture`): Màu xám, được lật ngược (`repeat.x = -1`) để khớp với mặt trước khi cuộn lại.
*   **Vật liệu (Material)**: Sử dụng `MeshStandardMaterial` hỗ trợ tương tác với ánh sáng.
*   **Mesh**: Tạo 2 Mesh (Mặt trước và Mặt sau) cùng chia sẻ một bộ khung Geometry để khi uốn cong Geometry, cả 2 mặt đều uốn theo.

## 3. Xử lý Tương tác (Interaction)
*   Sử dụng **Raycaster** để phát hiện vị trí chuột trên mặt phẳng 3D (mặt phẳng ảo Z=0).
*   Các sự kiện chuột:
    *   `onPointerDown`: Khi nhấn chuột, kiểm tra xem có nhấn vào trang giấy không. Nếu có, lưu vị trí bắt đầu (`startPoint`) và bật cờ `isDragging`.
    *   `onPointerMove`: Khi di chuyển chuột, cập nhật vị trí hiện tại (`currentPoint`) và gọi hàm tính toán uốn cong (`updateFold`).
    *   `onPointerUp`: Khi thả chuột, dừng kéo và gọi `resetGeometry` (tạm thời trả giấy về phẳng).

## 4. Logic Uốn Cong (Core Logic)
Đây là phần phức tạp nhất, nằm trong hàm `updateFold` và `updateGeometry`.

### Hàm `updateFold()`:
1.  **Vector Kéo**: Tính toán vector từ điểm bắt đầu đến điểm hiện tại của chuột.
2.  **Ẩn trang**: Nếu độ dài kéo lớn hơn 90% chiều rộng trang, container sẽ bị ẩn (`display = 'none'`) - đây là logic mới thêm vào.
3.  **Snap 8 hướng**: Góc kéo chuột được làm tròn thành các bội số của 45 độ (PI/4). Giúp nếp gấp luôn thẳng đẹp theo 8 hướng chính (ngang, dọc, chéo).
4.  **Fold Normal**: Tính toán vector pháp tuyến của nếp gấp dựa trên góc đã làm tròn.

### Hàm `updateGeometry()`:
Thuật toán biến đổi từng đỉnh (vertex) của trang giấy:
1.  Duyệt qua tất cả các đỉnh của `PlaneGeometry`.
2.  Tính **khoảng cách** từ đỉnh đó đến đường gấp (`foldOrigin`).
3.  Nếu đỉnh nằm trong vùng cần uốn (distance > 0):
    *   Áp dụng công thức cuộn hình trụ (Cylindrical Bend).
    *   Vị trí mới được tính toán bằng các hàm lượng giác `sin` và `cos` dựa trên bán kính cuộn (`radius = 4`).
    *   Đỉnh được dời về phía đường gấp và nâng lên theo trục Z tạo hiệu ứng cuộn tròn.
4.  Nếu đỉnh nằm ngoài vùng uốn, giữ nguyên vị trí cũ.
5.  Gọi `geometry.computeVertexNormals()` để cập nhật lại ánh sáng cho bề mặt mới bị biến dạng.

## 5. Nút Reset
*   Lắng nghe sự kiện click vào nút `#reset-btn`.
*   Khi click: Hiện lại canvas, đặt lại trạng thái kéo, và trả các đỉnh geometry về vị trí ban đầu (`originalPositions`).

## Tóm tắt luồng dữ liệu
1.  Người dùng kéo chuột → Raycaster tìm tọa độ 3D.
2.  Tính toán vector kéo → Xác định hướng cuộn (8 hướng).
3.  Duyệt qua từng điểm của trang giấy → Tính toán vị trí mới dựa trên công thức hình trụ.
4.  Cập nhật Screen → Renderer vẽ lại cảnh với Geometry mới.
