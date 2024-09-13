const formButton = document.getElementById('formButton');
const platform = document.getElementById('platform');
const multiUser = document.getElementById('multiUser');
const duration = document.getElementById('duration');
const price = document.getElementById('price');
const serviceName = document.getElementById('serviceName');

formButton.addEventListener('click', function (e) {
  // جلوگیری از ارسال فرم در صورت خطا
  let valid = true;

  // بررسی فیلدها
  if (!serviceName.value.trim()) {
    alert('لطفا نام سرویس را وارد کنید');
    valid = false;
  }
  if (!price.value.trim()) {
    alert('لطفا قیمت را وارد کنید');
    valid = false;
  }
  if (!duration.value.trim()) {
    alert('لطفا مدت زمان را وارد کنید');
    valid = false;
  }
  if (!multiUser.value.trim()) {
    alert('لطفا تعداد کاربران را وارد کنید');
    valid = false;
  }
  if (!platform.value) {
    alert('لطفا نوع پلتفرم را انتخاب کنید');
    valid = false;
  }

  if (!valid) {
    e.preventDefault(); // جلوگیری از ارسال فرم
  }
});
