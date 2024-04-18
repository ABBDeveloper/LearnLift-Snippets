import { Category } from "../enums";
import { LearningSetStatistics } from "./learning-set-statistics";

export class LearningSet {
    _id: string = '';
    name: string = '';
    _imageUrl: string = 'assets/learning_set_images/learn1.jpg';
    isCustomImage: boolean = false;
    _category: Category = 'Other';
    isPinned: boolean = false;
   
    statistics: LearningSetStatistics = new LearningSetStatistics(); 
  
    constructor(name: string) {
      this.name = name;
    }
  
    public get id(): string {
      return this._id;
    }
  
    public set id(value: string) {
      this._id = value;
    }
  
    public get imageUrl(): string {
      return this._imageUrl;
    }
  
    public set imageUrl(value: string) {
      this._imageUrl = value;
    }
  
    public get category(): Category {
      return this._category;
    }
  
    public set category(value: Category) {
      this._category = value;
    }

    static createFromFirestore(data: any): LearningSet {
      const learningSet = new LearningSet(data.name);
      Object.assign(learningSet, data);
      return learningSet;
    }

    toFirestoreObject(): any {
      return {
        id: this.id,
        name: this.name,
        imageUrl: this.imageUrl,
        isCustomImage: this.isCustomImage,
        category: this.category,
        isPinned: this.isPinned,
        statistics : this.statistics.toFirestoreObject(),
      };
    }
  }
  