(function(){
  // Car records come from the JSON block in index.html (edit them there).
  var cars = JSON.parse(document.getElementById('car-data').textContent);
  var $ = function(id){return document.getElementById(id)};
  var money = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});

  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

  function fillBrands(){
    var sel = $('brand');
    var brands = Array.from(new Set(cars.map(function(c){return c.brand}))).sort();
    sel.innerHTML = '<option value="">All brands</option>' + brands.map(function(b){return '<option>' + esc(b) + '</option>'}).join('');
  }

  function view(){
    var q = $('q').value.trim().toLowerCase(), b = $('brand').value, t = $('trans').value, s = $('sort').value;
    var out = cars.filter(function(c){
      if(b && c.brand !== b) return false;
      if(t && c.transmission !== t) return false;
      return !q || (c.brand + ' ' + c.model + ' ' + c.engine + ' ' + (c.gearbox || '')).toLowerCase().indexOf(q) > -1;
    });
    out.sort(function(x,y){
      if(s === 'priceAsc') return x.price - y.price;
      if(s === 'priceDesc') return y.price - x.price;
      return (x.brand + x.model).localeCompare(y.brand + y.model);
    });
    return out;
  }

  // The four-number stat strip. A stat is skipped if its field is missing in the JSON.
  function stats(c){
    var items = [
      [c.hp, 'hp'],
      [c.torque, 'lb-ft'],
      [c.zeroToSixty != null ? c.zeroToSixty + 's' : null, '0–60 mph'],
      [c.topSpeed, 'top mph']
    ].filter(function(i){ return i[0] != null; });
    if(!items.length) return '';
    return '<div class="specs">' + items.map(function(i){
      return '<div class="spec"><b>' + esc(i[0]) + '</b><span>' + i[1] + '</span></div>';
    }).join('') + '</div>';
  }

  function render(){
    var rows = view();
    $('count').textContent = rows.length + ' of ' + cars.length + ' cars';
    $('grid').innerHTML = rows.length ? rows.map(function(c){
      // The photo comes from the car's "image" field in index.html.
      var img = c.image ? '<img src="' + esc(c.image) + '" alt="' + esc(c.brand + ' ' + c.model) + '" loading="lazy">' : '';
      var gear = c.gearbox ? ' <span style="color:var(--muted)">' + esc(c.gearbox) + '</span>' : '';
      var drive = c.drivetrain ? '<dt>Drivetrain</dt><dd>' + esc(c.drivetrain) + '</dd>' : '';
      return '<article class="car"><figure><span>No photo yet</span>' + img + '</figure><div class="body">' +
        '<div><div class="brand">' + esc(c.brand) + '</div><h2>' + esc(c.model) + '</h2></div>' +
        stats(c) +
        '<dl><dt>Engine</dt><dd>' + esc(c.engine) + '</dd>' +
        '<dt>Transmission</dt><dd><span class="trans ' + esc(c.transmission) + '">' + (c.transmission === 'manual' ? 'Manual' : 'Automatic') + '</span>' + gear + '</dd>' +
        drive + '</dl>' +
        '<div class="price">' + money.format(c.price) + '<small>estimated</small></div></div></article>';
    }).join('') : '<p class="empty">No cars match. Clear the search or change a filter.</p>';
  }

  // If an image file is missing or the path is wrong, fall back to the placeholder.
  $('grid').addEventListener('error', function(e){
    if(e.target.tagName === 'IMG') e.target.remove();
  }, true);

  ['q','brand','trans','sort'].forEach(function(id){ $(id).addEventListener('input', render); });

  fillBrands();
  render();
})();