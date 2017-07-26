window.onload = function () {
  /**
   * 更新商品详情
   * */
  var goods_id = $.getQueryString('goods_id');
     console.log(goods_id);
  shop.api.fetchGoodsDetail(goods_id, function (response) {
      var content = '';
      var obj = response.data[0];
      content = `
      <div class="imgW" id="imgW">
        <img src="${obj.goods_thumb}" alt="">
      </div>
        <div class="pro-hd">
          <div class="descW">
            <h3 class="goods-desc">${obj.goods_desc} </h3>
            <a class="share" href="">分享</a>
          </div>
          <div class="priceW">
            <span class="price"><em>￥${obj.price}</em></span>
            <!--<span>不可用优惠券</span>-->
          </div>
      </div>
    `;

      $('#good').append(content);
  });
  /**
   * 添加购物车
   * 1.立即购买
   * 2.加入购物车
   * */
  $('.add-cart')[0].onclick = function() {
    //	验证用户是否登陆
    if ( !localStorage.token ) {
      location.href = 'login.html#callbackurl='+ location.href;
      return;
    }
    //获取当前商品已经购买的数量
    var goods_number = localStorage.getItem('cart_' + goods_id);
    
    console.log('cart_' + goods_id);
    
    goods_number = goods_number ? parseInt(goods_number)+1 : 1;
    
    shop.base.storage.setItem('cart_' + goods_id, goods_number);
    
    goods_number = shop.base.storage.getItem('cart_' + goods_id);
    
    console.log(goods_number)
    
    shop.api.updateCart(goods_id, goods_number, function(response){
      // location.href = 'cart.html';
      // alert('加入购物成功');
      $('.add-success').show(0).delay(2500).hide(0);
    });
  }
  $('.buy-now')[0].onclick = function() {
    //	验证用户是否登陆
    if ( !localStorage.token ) {
      location.href = 'login.html#callbackurl='+ location.href;
      return;
    }
    //获取当前商品已经购买的数量
    var goods_number = localStorage.getItem('cart' + goods_id);
    goods_number = goods_number ? parseInt(goods_number)+1 : 1;
    shop.api.updateCart(goods_id, goods_number, function(response){
      location.href = 'cart.html';
    });
  }
  
}