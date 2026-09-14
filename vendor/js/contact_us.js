$(".contact_btn").on('click', function () {
  $(".contact_btn i").removeClass('d-none');
  var proceed = true;
  if (!$('#userSubject').val()) proceed = false;
  if (!$('#userEmail').val()) proceed = false;
  if (!$('#userMessage').val()) proceed = false;

  if (!proceed) {
    alert('모든 칸을 입력해 주세요.');
    $(".contact_btn i").addClass('d-none');
    return;
  }

  var pathArray = window.location.pathname.split('/');
  var secondLevelLocation = pathArray[3];
  var accessURL;
  if(secondLevelLocation){
    accessURL="../vendor/contact-mailer.php";
  }else{
    accessURL="vendor/contact-mailer.php";
  }

  var str = $('#contact-form-data').serialize();

  $.ajax({
    type: 'POST',
    url: accessURL,
    data: str,
    dataType: 'json',
    success: function (response) {
      if (response.type == 'error') {
        alert(response.text);
      } else {
        alert('메일이 성공적으로 전송되었습니다 :D');
        $('#contact-form-data')[0].reset();
      }
      $(".contact_btn i").addClass('d-none');
    },
    error: function () {
      alert('서버 오류가 발생했습니다 뉴_뉴');
      $(".contact_btn i").addClass('d-none');
    }
  });
});
