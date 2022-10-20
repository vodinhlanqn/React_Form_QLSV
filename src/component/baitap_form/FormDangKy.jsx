import React, { Component } from 'react';
import { connect } from 'react-redux';

class FormDangKy extends Component {
    state = {
        sinhVien: {
            maSV: "",
            hoTen: "",
            soDienThoai: "",
            email: "",
        },
        error: {
            maSV: "",
            hoTen: "",
            soDienThoai: "",
            email: "",
        }
    }

    static getDerivedStateFromProps(newProps, currentState) {
        if (newProps.sinhVienUpdate !== "" && newProps.sinhVienUpdate.maSV !== currentState.sinhVien.maSV)
            return { ...currentState, sinhVien: newProps.sinhVienUpdate }//this.setState({})
    }

    changeValue = (event) => {
        const { sinhVien, error } = this.state;
        const { value, name, title } = event.target;

        // cách 1: 
        // nhanVien.taiKhoan = value;
        // cách 2: 
        // nhanVien["taiKhoan"] = value;

        //kiểm tra validation
        // kiểm tra rỗng
        if (value === "") {
            error[name] = `${title} không được rỗng !`;
        } else {
            error[name] = "";
        }

        const dataType = event.target.getAttribute("data-type");
        // xử lý validation theo trường hợp đặc biệt
        if (dataType === "email") {
            let regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (regexEmail.test(value) === false) {
                error[name] = `${title} không đúng định dạng !`;
            } else {
                error[name] = "";
            }
        }
        // if (dataType == "number") {
        // }

        sinhVien[name] = value;

        this.setState({
            sinhVien,
            error
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        let { maSV, hoTen, email, soDienThoai } = this.state.sinhVien;

        let maSVErr = this.state.error.maSV;
        let hoTenErr = this.state.error.maSV;
        let emailErr = this.state.error.maSV;
        let soDienThoaiErr = this.state.error.maSV;
        if (maSV !== ""
            && hoTen !== ""
            && email !== ""
            && soDienThoai !== ""
            && maSVErr === ""
            && hoTenErr === ""
            && emailErr === ""
            && soDienThoaiErr === "") {

            if (this.props.isSignUp) {
                this.props.dispatch({
                    type: "THEM_SINH_VIEN",
                    payload: {
                        sinhVien: this.state.sinhVien,
                    }
                })
            } else {
                this.props.dispatch({
                    type: "CAP_NHAT_SINH_VIEN",
                    payload: {
                        sinhVien: this.state.sinhVien,
                    }
                })
            }

            this.setState({
                sinhVien: {
                    maSV: "",
                    hoTen: "",
                    soDienThoai: "",
                    email: ""
                }
            })
        }

    }

    render() {
        const { sinhVien } = this.state;
        // this.setState({
        //     sinhVien: this.props.sinhVienUpdate
        // })
        const { maSV, hoTen, email, soDienThoai } = this.state.error;
        return (
            <div className='row '>
                <div className='col-12 p-2 bg-dark'>
                    <span className='text-white font-bold'>Thông tin Sinh viên</span>
                </div>

                <form className='col-12 row' onSubmit={this.onSubmit}>
                    <div className="col-6">
                        <label >Mã Sinh Viên</label>
                        <input title="Tài khoản"
                            value={this.state.sinhVien.maSV}
                            name="maSV" className="form-control" onChange={this.changeValue} />
                        <small className="text-danger">
                            {maSV}
                        </small>
                    </div>

                    <div className="col-6">
                        <label >Họ tên</label>
                        <input title="Họ tên"
                            value={this.state.sinhVien.hoTen}
                            name="hoTen" className="form-control" onChange={this.changeValue} />
                        <small className="text-danger">
                            {hoTen}
                        </small>
                    </div>

                    <div className="col-6">
                        <label >Số điện thoại</label>
                        <input data-type="number"
                            title="Số điện thoại"
                            value={this.state.sinhVien.soDienThoai}
                            name="soDienThoai"
                            className="form-control" onChange={this.changeValue} />
                        <small className="text-danger">
                            {soDienThoai}
                        </small>
                    </div>
                    <div className="col-6">
                        <label >Email</label>
                        <input
                            title="Email"
                            value={this.state.sinhVien.email}
                            data-type="email" name="email" className="form-control" onChange={this.changeValue} />
                        <small className="text-danger">
                            {email}
                        </small>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success m-2">Thêm sinh viên</button>

                        <button className="btn btn-primary m-2"
                            onClick={
                                () => this.props.dispatch({
                                    type: "CAP_NHAT_SINH_VIEN",
                                    payload: sinhVien.maSV
                                })}
                        >Cập nhật</button>
                    </div>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dsSinhVien: state.SinhVienReducer.dsSinhVien,
        sinhVienUpdate: state.SinhVienReducer.sinhVienUpdate,
        isSignUp: state.SinhVienReducer.isSignUp
    }
}

export default connect(mapStateToProps, null)(FormDangKy)