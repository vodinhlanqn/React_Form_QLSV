import React, { Component } from 'react';
import { connect } from 'react-redux';

class FormDangKy extends Component {
    state = {
        sinhVien: {
            maSV: "",
            hoTen: "",
            soDienThoai: "",
            email: ""
        },
        error: {
            maSV: '',
            hoTen: '',
            email: '',
            soDienThoai: ''
        },
        valid: false
    }

    changeValue = (event) => {
        const { sinhVien, error } = this.state;
        const { value, name, title, type } = event.target;

        /**
         * Kiểm tra Validate
         */

        //Kiểm tra rỗng
        if (value === '') {
            error[name] = `${title} không được bỏ trống!`;
        } else {
            error[name] = "";
        }

        //Kiểm tra Email
        if (type === "email" || type === 'number') {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!regexEmail.test(value)) {
                error[name] = `Email không đúng định dạng!`;
            } else {
                error[name] = "";
            }
        }
        //Kiểm tra Email
        if (name === 'soDienThoai') {
            let regexNumber = /^[0-9]+$/;
            if (!regexNumber.test(value)) {
                error[name] = `Số điện thoại không đúng định dạng!`;
            } else {
                error[name] = "";
            }
        }



        //lấy dữ liệu từ input thông qua thuộc tính name
        sinhVien[name] = value;
        this.setState({ sinhVien }, () => { this.renderButton() })
    }

    onSubmit = (event) => {
        event.preventDefault();

        let { maSV, hoTen, soDienThoai, email } = this.state.sinhVien;
        let { maSVErr, hoTenErr, soDienThoaiErr, emailErr } = this.state.error;
        if (maSV !== "" && hoTen !== "" && soDienThoai !== "" && email !== ""
            // && maSVErr !== "" && hoTenErr !== "" && soDienThoaiErr !== "" && emailErr !== ""
        ) {
            //Thêm dữ liệu Sinh Viên
            this.props.dispatch({
                type: "THEM_SINH_VIEN",
                payload: {
                    sinhVien: this.state.sinhVien
                }
            })

            //reset lại form
            // this.renderButton();
            event.target.reset();
        }
    }

    renderButton = () => {
        let valid = true;
        for (let key in this.state.errors) {
            if (this.state.errors[key] !== '' || this.state.values[key] === '') {
                valid = false;
            }
        }

        this.setState({
            ...this.state,
            valid: valid
        })
    }

    render() {
        // console.log(this.props.dsSinhVien);
        const { maSV, hoTen, soDienThoai, email } = this.state.error;
        return (
            <div className='row ' >
                <div className='col-12 p-2 bg-dark'>
                    <span className='text-white font-bold'>Thông Tin Sinh Viên</span>
                </div>

                <form className='col-12 ' onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-6 mt-2 form-group">
                            <span >Mã SV</span>
                            <input name='maSV' className="form-control" title='Mã SV' value={this.state.sinhVien.maSV} onChange={this.changeValue} />
                            <span className="text-danger">{maSV}</span>
                        </div>

                        <div className="col-6 mt-2 form-group">
                            <span >Họ tên</span>
                            <input name='hoTen' className="form-control" title='Họ Tên' value={this.state.sinhVien.hoTen} onChange={this.changeValue} />
                            <span className="text-danger">{hoTen}</span>
                        </div>

                        <div className="col-6 mt-2 form-group">
                            <span >Email</span>
                            <input type="email" name='email' className="form-control" title='Email' value={this.state.sinhVien.email} onChange={this.changeValue} />
                            <span className="text-danger">{email}</span>
                        </div>

                        <div className="col-6 mt-2 form-group">
                            <span >Số điện thoại</span>
                            <input name='soDienThoai' className="form-control" title='Số Điện Thoại' value={this.state.sinhVien.soDienThoai} onChange={this.changeValue} />
                            <span className="text-danger">{soDienThoai}</span>
                        </div>

                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12 text-right">
                            {this.state.valid
                                ?
                                <button className="btn btn-success">Thêm sinh viên</button>
                                :
                                <button className="btn btn-primary ml-3" disabled>Thêm sinh viên</button>
                            }
                            {/* {this.renderButton()} */}
                        </div>
                    </div>
                </form>

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dsSinhVien: state.SinhVienReducer.dsSinhVien
    }
}

export default connect(mapStateToProps, null)(FormDangKy)