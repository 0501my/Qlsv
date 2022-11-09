let danhSachSinhVien = new DanhSachSinhVien();
 GetStorage();

let validate = new Validation();

//Bổ sung thuộc tính
SinhVien.prototype.DiemToan = '';
SinhVien.prototype.DiemLy = '';
SinhVien.prototype.DiemHoa = '';
SinhVien.prototype.DTB = '';
SinhVien.prototype.Loai = '';
//Thêm phương thức
SinhVien.prototype.TinhDTB = function () {
    this.DTB = (Number(this.DiemToan) + Number(this.DiemLy) + Number(this.DiemHoa)) / 3;
}
SinhVien.prototype.XepLoai = function () {
    if (this.DTB <= 10 && this.DTB >= 8) {
        this.Loai = "Xếp loại Giỏi";
    } else if (this.DTB < 8 && this.DTB >= 6.5) {
        this.Loai = "Xếp loại Khá";
    } else if (this.DTB < 6.5 && this.DTB >= 5) {
        this.Loai = "Xếp loại Trung Bình";
    } else {
        this.Loai = "Xếp loại yếu";
    }
}



function ThemSinhVien() {
    //Lấy dữ liệu từ người dùng nhập vào
    let masv = document.getElementById('maSv').value;
    let hoten = document.getElementById("hoten").value;
    let cmnd = document.getElementById("cmnd").value;
    let email = document.getElementById("email").value;
    let sdt = document.getElementById("sdt").value;
    let loi = 0;
    //Kiểm tra validation
    //Thêm sinh viên
    let sinhvien = new SinhVien(maSv, hoten, email, sdt, cmnd);
    sinhvien.DiemHoa = document.getElementById("Toan").value;
    sinhvien.DiemLy = document.getElementById("Ly").value;
    sinhvien.DiemHoa = document.getElementById("Hoa").value;
    sinhvien.TinhDTB();
    sinhvien.XepLoai();
    danhSachSinhVien.ThemSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
    console.log(danhSachSinhVien);
}


function KiemTraDauVaoRong(ID, value) {
    //Kiểm tra mã sinh viên rỗng
    if (validate.KiemTraRong(value) == true) {
        document.getElementById(ID).style.borderColor = "red";
        return true;
    } else {
        document.getElementById(ID).style.borderColor = "green";
        return false;
    }
}


function CapNhatDanhSachSV(DanhsachSinhVien) {
    console.log(DanhsachSinhVien)
    let lstTableSV = document.getElementById("tbodySinhVien");
    lstTableSV.innerHTML = "";
    for (let i = 0; i < DanhsachSinhVien.DSSV.length; i++) {
        //Lấy thông tin sinh viên từ trong mảng sinh viên
        let sv = DanhsachSinhVien.DSSV[i];
        //Tạo thẻ t r
        let trSinhVien = document.createElement("tr");
        trSinhVien.id = sv.MaSV;
        trSinhVien.className = "trSinhVien";
        trSinhVien.setAttribute("onclick", "ChinhSuaSinhVien('" + sv.MaSV + "')");
        //Tạo các thẻ td và filter dữ liệu sinh viên thứ [i] vào
        let tdCheckBox = document.createElement('td');
        let ckbMaSinhVien = document.createElement('input');
        console.log(ckbMaSinhVien);
        ckbMaSinhVien.setAttribute("class", "ckbMaSV");
        ckbMaSinhVien.setAttribute("type", "checkbox");
        ckbMaSinhVien.setAttribute("value", sv.MaSV);
        tdCheckBox.appendChild(ckbMaSinhVien);

        let tdMaSV = TaoTheTD("MaSV", sv.MaSV);
        let tdHoTen = TaoTheTD("HoTen", sv.HoTen);
        let tdCMND = TaoTheTD("CMND", sv.CMND);
        let tdEmail = TaoTheTD("Email", sv.Email);
        let tdSoDT = TaoTheTD("SoDT", sv.SoDT);

        //Tạo td  DTB và  xếp loại
        let tdDTB = TaoTheTD("DTB", sv.DTB);
        let tdXepLoai = TaoTheTD("XepLoai", sv.Loai);
        //Append các td vào tr
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdEmail);
        trSinhVien.appendChild(tdSoDT);
        trSinhVien.appendChild(tdDTB);
        trSinhVien.appendChild(tdXepLoai);

        //Append các tr vào tbodySinhVien
        lstTableSV.appendChild(trSinhVien);
    }

}

function TaoTheTD(className, value) {
    let td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}


function SetStorage() {
    //Chuyển đổi object mảng danh sách sinh viên thành chuỗi json
    // let jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
    // Rồi đem chuỗi json lưu vào storage và đặt tên là DanhSachSV
    // localStorage.setItem("DanhSachSV", jsonDanhSachSinhVien);
}

function GetStorage() {
    //Lấy ra chuỗi json là mảng danhsachsinhvien thông qua tên DanhSachSV
   // let jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
   //let mangDSSV = JSON.parse(jsonDanhSachSinhVien);
    //danhSachSinhVien.DSSV = mangDSSV;
    //CapNhatDanhSachSV(danhSachSinhVien);

}

//Xóa sinh viên
function XoaSinhVien() {
    //Mảng checkbox
    let lstMaSV = document.getElementsByClassName("ckbMaSV");
    //Mảng mã sinh viên được chọn
    let lstMaSVDuocChon = [];
    for (i = 0; i < lstMaSV.length; i++) {
        console.log(lstMaSV[i]);
        if (lstMaSV[i].checked) //Kiểm phần tử checkbox đó có được chọn hay chưa
        {
            lstMaSVDuocChon.push(lstMaSV[i].value);
        }
    }
    danhSachSinhVien.XoaSinhVien(lstMaSVDuocChon);
    CapNhatDanhSachSV(danhSachSinhVien);
}


function TimKiemSinhVien() {
    let tukhoa = document.getElementById("tukhoa").value;
    let lstDanhSachSinhVienTimKiem = danhSachSinhVien.TimKiemSinhVien(tukhoa);
    CapNhatDanhSachSV(lstDanhSachSinhVienTimKiem);
}


function ChinhSuaSinhVien(masv) {

    let sinhvien = danhSachSinhVien.TimSVTheoMa(masv);
    if (sinhvien != null) {
        document.getElementById("masv").value = sinhvien.MaSV;
        document.getElementById("hoten").value = sinhvien.HoTen;
        document.getElementById("cmnd").value = sinhvien.CMND;
        document.getElementById("email").value = sinhvien.Email;
        document.getElementById("sdt").value = sinhvien.SoDT;
    }

}

function LuuThongTin() {
    //Lấy dữ liệu từ người dùng nhập vào
    let masv = document.getElementById("masv").value;
    let hoten = document.getElementById("hoten").value;
    let cmnd = document.getElementById("cmnd").value;
    let email = document.getElementById("email").value;
    let sdt = document.getElementById("sdt").value;
    let loi = 0;
    //Kiểm tra validation
    if (KiemTraDauVaoRong("masv", masv) == true) {
        loi++;
    }
    if (KiemTraDauVaoRong("hoten", hoten) == true) {
        loi++;
    }
    if (KiemTraDauVaoRong("cmnd", cmnd) == true) {
        loi++;
    }
    if (validate.KiemTraEmail(email)) {
        document.getElementById("email").style.borderColor = "green";
    } else {
        document.getElementById("email").style.borderColor = "red";
        loi++;
    }
    if (validate.KiemTraSoDT(sdt)) {
        document.getElementById("sdt").style.borderColor = "green";
    } else {
        document.getElementById("sdt").style.borderColor = "red";
        loi++;
    }
    if (loi != 0) {
        return;
    }
    //Thêm sinh viên
    var sinhvien = new SinhVien(masv, hoten, email, sdt, cmnd);
    sinhvien.DiemHoa = document.getElementById("Toan").value;
    sinhvien.DiemLy = document.getElementById("Ly").value;
    sinhvien.DiemHoa = document.getElementById("Hoa").value;
    sinhvien.TinhDTB();
    sinhvien.XepLoai();
    danhSachSinhVien.SuaSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
}

