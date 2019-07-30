var stripe = Stripe('pk_test_hLcVt3AdA6FihpfKfGtHMQhg00oQKRrwu6');
var $form = $('#checkout-form');
$form.submit(function (event) { 
  $('#charge-error').addClass('hidden');
  $form.find('button').prop('disabled', true);
  stripe.createToken('bank_account', {
    country: $('#Country').val(),
    currency: $('#Currency').val(),
    routing_number: $('#Routing-Number').val(),
    account_number: $('#Cart-Number').val(),
    account_holder_name: $('#Cart-Name').val(),
    account_holder_type: $('#Cart-Holder-Type').val(),
  }).then(function(result) {
    if(result.error) {
      $('#charge-error').text(result.error.message);
      $('#charge-error').removeClass('hidden');
      $form.find('button').prop('disable', false);
    } else {
      var token = result.token;
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      $form.get(0).submit();
    }
  });

})