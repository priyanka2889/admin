$(document).ready(function(){
	setCountry();
	setComptype();
	$("#branches").hide();

$("#cpny_branches_y").click(function(){
		 $("#branches").show();
});
$("#search").click(function(){
		 $("#searchText").toggle("slow");
		 $("#search").toggleClass("ui-icon-search");
		  $("#search").toggleClass("ui-icon-arrow-u");
});
$("#cpny_branches_n").click(function(){
		 $("#branches").hide();
});
   
$("#cpny_country").on("change",function(){
	var val = $("#cpny_country").val();
    	setState(val);
});

$("#cpny_state").on("change",function(){
	var val = $("#cpny_state").val();
    	setCity(val);
});

$("#cpny_city").on("change",function(){
	var val = $("#cpny_city").val();
    	setPin(val);
});
});


function setCountry(){
	
	$.ajax({
	  type:"GET",
	  url:base_url+"countrylist",
	  dataType:"json",
	success:function(data){
		$("#cpny_country").empty();
		$("#edit_cpny_country").empty();
		$("#cpny_country").append('<option  value=""></option>');
		$("#edit_cpny_country").append('<option  value=""></option>');
		$.each(data,function(value,item){
		
		$("#cpny_country").append('<option  value="'+item.name+'">'+item.name+'</option>');
		$("#edit_cpny_country").append('<option  value="'+item.name+'">'+item.name+'</option>');
			
		});
		
	},
	error:onError
});
}
function setState(country){
	
	$.ajax({
	  type:"GET",
	  url:base_url+"statelist/"+country,
	  dataType:"json",
	success:function(data){
		//alert(data);
		$("#cpny_state").empty();
		$("#edit_cpny_state").empty();
		$("#cpny_state").append('<option  value=""></option>');
		$("#edit_cpny_state").append('<option  value=""></option>');
		$.each(data,function(value,item){
		
		$("#cpny_state").append('<option  value="'+item.name+'">'+item.name+'</option>');
		$("#edit_cpny_state").append('<option  value="'+item.name+'">'+item.name+'</option>');
			
		});
		
	},
	error:onError
   		
});
}
function setCity(state){
	
	$.ajax({
	  type:"GET",
	  url:base_url+"citylist/"+state,
	  dataType:"json",
	success:function(data){
		$("#cpny_city").empty();
		$("#cpny_city").append('<option  value=""></option>');
		$("#edit_cpny_city").empty();
		$("#edit_cpny_city").append('<option  value=""></option>');
		$.each(data,function(value,item){
		$("#cpny_city").append('<option  value="'+item.name+'">'+item.name+'</option>');
		$("#edit_cpny_city").append('<option  value="'+item.name+'">'+item.name+'</option>');	
		});
		
		
	},
	error:onError
   		
});
	
	
}

function setPin(city){
	
	$.ajax({
	  type:"GET",
	  url:base_url+"pinlist/"+city,
	  dataType:"json",
	success:function(data){
		$("#cpny_pin").empty();
		$("#cpny_pin").append('<option  value=""></option>');
		$("#edit_cpny_pin").empty();
		$("#edit_cpny_pin").append('<option  value=""></option>');
		$.each(data,function(value,item){
		
		$("#cpny_pin").append('<option  value="'+item.Pincode+'">'+item.Pincode+'</option>');
		$("#edit_cpny_pin").append('<option  value="'+item.Pincode+'">'+item.Pincode+'</option>');
			
		});
	},
	error:onError
   		
});
}
function setComptype(){
	
	$.ajax({
	  type:"GET",
	  url:base_url+"companytypelist",
	  dataType:"json",
	success:function(data){
		$("#cpny_ct_type").empty();
		$("#cpny_ct_type").append('<option  value=""></option>');
		$("#edit_cpny_ct_type").empty();
		$("#edit_cpny_ct_type").append('<option  value=""></option>');
		$.each(data,function(value,item){
		$("#cpny_ct_type").append('<option  value="'+item.ct_type+'">'+item.ct_type+'</option>');
		$("#edit_cpny_ct_type").append('<option  value="'+item.ct_type+'">'+item.ct_type+'</option>');
		});
	},
	error:onError

});
}

$(document).on("blur","#cpny_user_email",function(){
	var user_email=$("#cpny_user_email").val();
	if (user_email=="")
		{
			$('#user_msg').html('Email Id Please'); 
		}
	else
	{
		$.ajax({
		type:"POST",
		url:base_url+"checkusername/"+user_email,
		dataType:"json",
		success:function(data){
			if(data==1){
				
				$('#user_msg').html('Email Id already exists'); 
				$("#cpny_user_email").val("");
			}
						
			},
			error:onError
		});
	}
});

$(document).on("focus","#cpny_user_email",function(){
$('#user_msg').html(''); 
});
		
$(document).on("click","#submit",function(){
	$("#regcompany").validate({
	
			rules: {
					cpny_ct_type:{required:true	},
					cpny_name:{required:true},
					cpny_country:{required:true	},
					cpny_state:{required:true	},
					cpny_city:{required:true},
					cpny_pin:{required:true	},
					cpny_add1:{required:true},
					cpny_contact:{required:true	},
					cpny_website:{required:true , url:true },
					cpny_email:{required:true , email:true	},
					cpny_profile:{required:true	},
					cpny_user_email:{required:true,email:true},
					usr_password:{required:true	},
					confusr_password:{required:true,
									  equalTo:usr_password
									 },
					},
					errorPlacement: function( error, element ) {
						error.insertAfter( element.parent() );
					},
					submitHandler: function (form) {
						var formdata=$("#regcompany").serialize();
						$.ajax({
							type:"GET",
							 url:base_url+"recruiter/create",
							 data:formdata,
							 dataType:"json",
							 success:function(data){
								 if(data.status==1)
								 {
									 //alert("Registered Sucessful");
									
									navigator.notification.confirm("Registered Sucessful",registrationCallBack, "Confirmation", "Ok");
									$.mobile.loading('show');
									function registrationCallBack(button){
									$.mobile.loading('hide');
									if(button == 1) {
									window.location="index.html";
									}
								}
									
									
								 }
								 else
								 {
									  //alert("Registration Fail");
									  navigator.notification.alert(
										'Registration Fail',  // message
										null,         // callback
										'Error:',            // title
										'Ok'                  // buttonName
									);
								 }
							 },
							 error:onError
							
						}); 
	         
					}
				});
		});
		
		function onError(data, status)
         {
			 navigator.notification.alert(
			'Error',  // message
			null,         // callback
			'Something went wrong:',            // title
			'Ok'                  // buttonName
			);
         }  

