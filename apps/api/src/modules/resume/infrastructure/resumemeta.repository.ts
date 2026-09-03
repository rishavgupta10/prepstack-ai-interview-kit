import { ICreateResumeMetaDataInput } from "../domain/resumemetadata.dto";
import { ResumeMetaDataModel } from "../model/resumebuilder.model";

export class ResumeMetaDataRepository {
  async create(data: ICreateResumeMetaDataInput) {
    return ResumeMetaDataModel.create(data);
  }

  async fetchResumeMetaData(userId: string) {
    return ResumeMetaDataModel.findOne({ userId });
  }

  async findByResumeId(id: string) {
    return ResumeMetaDataModel.findById(id).select("_id");
  }

  async FindByIdAndUpdate(id:string,data:ICreateResumeMetaDataInput){
    return ResumeMetaDataModel.findByIdAndUpdate(id,data,{new:true})
  }
}
