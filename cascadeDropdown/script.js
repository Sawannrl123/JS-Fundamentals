$(document).ready(function(e){
  function get_json_data(code,region) {
      //alert("a " + code)
      var html_code = "";
      $.getJSON('./mockData.json', function(data){
          ListName = code.substr(0, 1).toUpperCase() + code.substr(1);
          html_code += '<option value="">Select ' + ListName + '</option>';
          $.each(data, function(key, value) {
              if(value.region == region) {
                  html_code += '<option value="' + value.code + '">' + value.name + '</option>';
              }
          });
          $('#' + code).html(html_code);
      });
  }
  get_json_data('region', 0);

  $(document).on('change', '#region', function() {
      var region_id = $(this).val();
      if (region_id != '') {
          get_json_data('province', region_id);
      } else {
          $('#province').html('<option value="">Select Province</option>');
      }
      $('#municipality').html('<option value="">Select Municipality</option>');
      $('#barangay').html('<option value="">Select Barangay</option>');
  });

  $(document).on('change', '#province', function() {
      var province_id = $(this).val();
      if (province_id != '') {
          get_json_data('municipality', province_id);
      } else {
          $('#municipality').html('<option value="">Select Municipality</option>');
      }
  });

  $(document).on('change', '#municipality', function() {
      var municipality_id = $(this).val();
      if (municipality_id != '') {
          get_json_data('barangay', municipality_id);
      } else {
          $('#barangay').html('<option value="">Select Barangay</option>');
      }
  });

  // $("#region option:selected").text('{{ form.region.value }}');
  // $("#province option:selected").text('{{ form.province.value }}');
  // $("#municipality option:selected").text('{{ form.municipality.value }}');
  // $("#barangay option:selected").text('{{ form.barangay.value }}');
});