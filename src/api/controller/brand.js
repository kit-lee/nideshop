const Base = require('./base.js');

module.exports = class extends Base {
  async listAction() {
    const data = await this.model('brand').where({is_show: true}).order({id: 'asc', sort_order: 'asc'})
      .page(this.get('page') || 1, this.get('size') || 10).countSelect();

    return this.success(data);
  }

  async detailAction() {
    const model = this.model('brand');
    const data = await model.where({id: this.get('id')}).find();

    return this.success({brand: data});
  }
};
