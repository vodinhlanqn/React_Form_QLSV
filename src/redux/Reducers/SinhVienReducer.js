const stateDefault = {
    dsSinhVien: []
}

export const SinhVienReducer = (state = stateDefault, action) => {
    const { type, payload } = action;
    switch (type) {
        case "THEM_SINH_VIEN": {
            let dsSinhVien = [...state.dsSinhVien];

            let sinhVienNew = dsSinhVien.find(sinhVien =>
                sinhVien.maSV === payload.sinhVien.maSV
            );
            // console.log("sinh vien New", sinhVienNew);

            if (sinhVienNew) {
                alert("Mã Sinh Viên đã tồn tại!")
            } else {
                dsSinhVien.push(payload.sinhVien);
            }
            return { ...state, dsSinhVien };
        }
        case "XOA_NHAN_VIEN": {
            let dsSinhVien = [...state.dsSinhVien];

            let dsSinhVienNew = dsSinhVien.filter(sinhVien => sinhVien.maSV !== payload)

            return { ...state, dsSinhVien: dsSinhVienNew };
        }
        default:
            return { ...state };
    }
}