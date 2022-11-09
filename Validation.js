function Validation() {
    this.KiemTraRong = function (value) {
        if (value.trim() === "") {
            return true;
        }
        return false;
    }// kiểm tra email
    this.KiemTraEmail = function (value) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value.toLowerCase()); //chuỗi kiểm tra
    }
    this.KiemTraSoDT = function (value) {
        let re = /^\d+$/;
        if (re.test(value) && value.length >= 10) {
            return true;
        }
        return false;
    }
}
