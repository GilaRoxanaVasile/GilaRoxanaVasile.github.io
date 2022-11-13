(function($) {

	"use strict";


  // Form
	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					subject: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Va rugam sa va introduceti numele si prenumele",
					subject: "Va rugam sa introduceti subiectul",
					email: "Va rugam sa introduceti o adresa de email valida",
					message: "Va rugam sa introduceti mesajul dvs."
				},
				/* submit via ajax */
				
				submitHandler: function(form) {		
					var $submit = $('.submitting'),
						waitText = 'Se trimite...';

					$.ajax({   	
				      type: "POST",
				      url: "php/sendEmail.php",
				      data: $(form).serialize(),

				      beforeSend: function() { 
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
		               if (msg == 'OK') {
		               	$('#form-message-warning').hide();
				            setTimeout(function(){
		               		$('#contactForm').fadeIn();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();   
		               	}, 1400);

		               	setTimeout(function(){
				               $('#form-message-success').fadeOut();   
		               	}, 8000);

		               	setTimeout(function(){
				               $submit.css('display', 'none').text(waitText);  
		               	}, 1400);

		               	setTimeout(function(){
		               		$( '#contactForm' ).each(function(){
											    this.reset();
											});
		               	}, 1400);
			               
			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
						$('#form-message-warning').hide();
						setTimeout(function(){
						   $('#contactForm').fadeIn();
					   }, 1000);
						setTimeout(function(){
						   $('#form-message-success').fadeIn();   
					   }, 1400);

					   setTimeout(function(){
						   $('#form-message-success').fadeOut();   
					   }, 8000);

					   setTimeout(function(){
						   $submit.css('display', 'none').text(waitText);  
					   }, 1400);

					   setTimeout(function(){
						   $( '#contactForm' ).each(function(){
											this.reset();
										});
					   }, 1400);
					   
				      	//$('#form-message-warning').html("Something went wrong. Please try again.");
				         //$('#form-message-warning').fadeIn();
				        // $submit.css('display', 'none');
				      }
			      });    		
		  		} // end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);
