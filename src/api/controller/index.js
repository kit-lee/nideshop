const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const banner = await this.model('ad').where({ad_position_id: 1}).select();
    const channel = await this.model('channel').order({sort_order: 'asc'}).select();
    const newGoods = await this.model('goods').field(['id', 'name', 'list_pic_url', 'retail_price']).where({is_delete: 0, is_new: 1}).limit(4).select();
    const hotGoods = await this.model('goods').field(['id', 'name', 'list_pic_url', 'retail_price', 'goods_brief']).where({is_delete: 0, is_hot: 1}).limit(3).select();
    const brandList = await this.model('brand').where({is_new: 1}).order({new_sort_order: 'asc'}).limit(4).select();
    const topicList = await this.model('topic').limit(3).select();

    const categoryList = await this.model('category').where({parent_id: 0, is_show: 1, show_index: 1}).order('sort_order ASC, id ASC').select();
    const newCategoryList = [];
    for (const categoryItem of categoryList) {
      const childCategoryIds = await this.model('category').where({parent_id: categoryItem.id}).getField('id', 100);
      const categoryGoods = await this.model('goods').field(['id', 'name', 'list_pic_url', 'retail_price']).where({is_delete: 0, category_id: ['IN', childCategoryIds]}).limit(7).select();
      newCategoryList.push({
        id: categoryItem.id,
        name: categoryItem.name,
        icon: categoryItem.icon_url,
        goodsList: categoryGoods
      });
    }

    return this.success({
      banner: banner,
      channel: channel,
      newGoodsList: newGoods,
      hotGoodsList: hotGoods,
      brandList: brandList,
      topicList: topicList,
      categoryList: newCategoryList
    });
  }
};
