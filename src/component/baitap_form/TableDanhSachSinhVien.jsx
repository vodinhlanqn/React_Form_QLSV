import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableDanhSachSinhVien extends Component {

    renderSinhVien = () => {
        const { dsSinhVien } = this.props;
        return dsSinhVien.map((sinhVien, index) => {
            return (
                <tr key={index} >
                    <td>{index + 1}</td>
                    <td>{sinhVien.maSV}</td>
                    <td>{sinhVien.hoTen}</td>
                    <td>{sinhVien.email}</td>
                    <td>{sinhVien.soDienThoai}</td>
                    <td className='text-right'>
                        <button className='btn btn-warning mx-2'
                            onClick={() => this.props.dispatch({
                                type: "LAY_SINH_VIEN",
                                payload: sinhVien.maSV
                            })}
                        >Sửa</button>
                        <button className='btn btn-danger' onClick={
                            () => this.props.dispatch(
                                {
                                    type: "XOA_SINH_VIEN",
                                    payload: sinhVien.maSV
                                }
                            )
                        }>Xóa</button>
                    </td>
                </tr >
            )
        })
    }

    render() {
        return (
            <div className='row'>
                <div className='col-12 p-2 bg-dark'>
                    <span className='text-white font-bold'>Danh sách</span>
                </div>
                <div className='col-12'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã SV</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th ></th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>johncena</td>
                                <td>john cena</td>
                                <td>john@gmail.com</td>
                                <td>0909090909</td>
                                <td className='text-right'>
                                    <button className='btn btn-warning mx-2'>Sửa</button>
                                    <button className='btn btn-danger'>Xóa</button>
                                </td>
                            </tr>
                            {this.renderSinhVien()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dsSinhVien: state.SinhVienReducer.dsSinhVien
    }
}

export default connect(mapStateToProps, null)
    (TableDanhSachSinhVien)
