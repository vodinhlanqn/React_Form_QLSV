const stateDefault = {
    isSignUp: true,
    dsSinhVien: [],
    sinhVienUpdate: "",
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
        case "XOA_SINH_VIEN": {
            let dsSinhVien = [...state.dsSinhVien];

            let dsSinhVienNew = dsSinhVien.filter(sinhVien => sinhVien.maSV !== payload)

            return { ...state, dsSinhVien: dsSinhVienNew };
        }

        case "LAY_SINH_VIEN": {
            let dsSinhVien = [...state.dsSinhVien];

            let sinhVienTam = dsSinhVien.find(sinhVien => sinhVien.maSV === payload);

            return { ...state, sinhVienUpdate: sinhVienTam, isSignUp: false };
        }
        case "CAP_NHAT_SINH_VIEN": {
            let dsSinhVien = [...state.dsSinhVien];
            let sinhVienTam = dsSinhVien.find(sinhVien => sinhVien === payload);
            return { ...state, sinhVienUpdate: sinhVienTam, isSignUp: false };

        }
        default:
            return { ...state };
    }
}