export class BaseService {
  constructor (model) {
    this.model = model;
  }

  create (values) {
    return this.model.create(values);
  }

  findOne (query) {
    return this.model.findOne(query).exec();
  }

  find (query) {
    return this.model.find(query).exec();
  }

  findById (id) {
    return this.model.findOne({ _id: id }).exec();
  }

  remove (query) {
    return this.model.findOneAndDelete(query).exec();
  }

  removeById (id) {
    return this.model.findOneAndDelete({ _id: id }).exec();
  }

  findAll (query) {
    return this.model.find(query).exec();
  }

  updateById (values) {
    return this.model
      .findOneAndUpdate({ _id: values.id }, values, {
        new: true,
        runValidators: true,
      })
      .exec();
  }
}
export default BaseService;
