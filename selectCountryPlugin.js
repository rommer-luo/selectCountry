(function( $ ){

    var methods = {
        init : function( options ) {
            var opt = {};
            opt.$el = $(this);
            opt.settings = $.extend( {
                'location'         : 'top',
                'background-color' : 'blue'
            }, options);

            methods.initHtml( '', opt );

            methods.event( opt );

        },
        initHtml : function( data, option ) {
            option.$el.empty().append(
                '<input type="text" name="countryCode" class="layui-input country-code"  placeholder="国家代码">' +
                '<input type="button" value="…" class="layui-btn layui-btn-primary country-select-btn">' +
                '<input type="text" name="countryName" class="layui-input country-name"  placeholder="国家名称">'
            )
        },
        selectModel: function( option ) {
            layer.open({
                type: 1,
                title: '<b>国家代码名称查询</b>',
                area: ['40%', '70%'],
                shadeClose: true, //点击遮罩关闭
                maxmin: true,
                btn: [],
                content: '' +
                '<div class="search-box selectCountryModel">' +
                ' <div class="layui-form-item selectCountryTop">' +
                '<div class="layui-input-inline">' +
                '<input type="text" placeholder="请输入国家代码" autocomplete="off" class="layui-input countryCode">' +
                '</div>' +
                '<div class="layui-input-inline">' +
                '<input type="text" placeholder="请输入国家名称" autocomplete="off" class="layui-input countryName">' +
                '</div>' +
                '<div class="layui-input-inline">' +
                '<button class="btn btn-success generator btn-search"><i class="layui-icon layui-icon-search"></i>&nbsp;搜索</button>' +
                '<button class="btn btn-success generator btn-refresh"><i class="layui-icon layui-icon-refresh"></i>&nbsp;刷新</button>' +
                '</div>' +
                '</div>' +
                '<table class="layui-table" id="customerListTable" lay-filter="customerListTable"></table>' +
                '</div>',
                success: function ( layero, index ) {
                    function initCustomerList()
                    {
                        var code = $.trim( $('.countryCode', layero).val() );
                        var name = $.trim( $('.countryName', layero).val() );

                        var dataGet = '?code=' + code + '&name=' + name;

                        layui.use( 'table', function(){
                            var table = layui.table;

                            //第一个实例
                            table.render({
                                elem: '#customerListTable'
                                ,height: 500
                                ,url: "api_getCountryList" + dataGet //数据接口
                                ,page: true //开启分页
                                ,cols: [[ //表头
                                    {title: '序号', width: 66, align: 'center', templet: function(d)
                                        {
                                            return d.LAY_INDEX;
                                        }
                                    }
                                    ,{field: 'CountryCode', title: '客户代码',}
                                    ,{field: 'CountryName', title: '客户名称', }
                                    ,{fixed: 'right', width:100, align:'center', templet: function(d)
                                        {
                                            return "<a class='layui-btn layui-btn-xs' lay-event='selectCountry'>" +
                                                    "<i class='fa fa-pencil'></i>&nbsp;选择" +
                                                    "</a>";
                                        }
                                    }
                                ]],
                                done: function ( res, curr, count ) {
                                    $('th').css({
                                        'background-color': '#18bc9c',
                                        'color': '#fff',
                                        'font-size': '16px',
                                        'font-weight': 'bold'
                                    });
                                }
                            });

                            table.on('tool(customerListTable)', function( obj ){
                                var layEvent = obj.event;

                                if (layEvent == 'selectCountry') {
                                    layer.closeAll( 'dialog' );
                                    layer.close( index );

                                    methods.putSelectedInfo( obj.data, option );

                                }

                            });
                        });
                    }
                    initCustomerList();

                    $('.btn-search', layero).click(function () {
                        initCustomerList();
                    });

                    $('.btn-refresh', layero).click(function () {
                        $('.countryCode', layero).val('');
                        $('.countryName', layero).val('');
                        initCustomerList();
                    });
                }
            });
        },
        event : function( option ) {
            $('.country-select-btn', option.$el).click(function () {
                methods.selectModel( option );
            });
        },
        putSelectedInfo : function( data , option ) {
            $( '.country-code', option.$el).val(data.CountryCode);
            $( '.country-name', option.$el).val(data.CountryName);
        }
    };

    $.fn.countrySelect = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }

    };

})( jQuery );