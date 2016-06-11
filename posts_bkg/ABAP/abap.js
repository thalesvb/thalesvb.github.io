var dt = new Date();
var sdt = dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
var edtph = document.getElementById("abap_st22_date_time");
edtph.innerText = sdt;
