
import React, { Component } from 'react';
import FormDangKy from './FormDangKy';
import TableDanhSachSinhVien from './TableDanhSachSinhVien';

class BaiTapQuanLySinhVien extends Component {
    render() {
        return (
            <div className='container text-left text-lg mt-4' >
                <h1 className='text-center  mb-5'>BÀI TẬP FORM - QUẢN LÝ SINH VIÊN</h1>
                <FormDangKy />
                <TableDanhSachSinhVien />
            </div>
        );
    }
}

export default BaiTapQuanLySinhVien;