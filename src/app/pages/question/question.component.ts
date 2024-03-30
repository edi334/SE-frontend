import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAnswer, IQuestionAndAnswers} from '../../models/question.interface';
import {CriteriaService} from '../../services/criteria.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {
  questionAndAnswers!: IQuestionAndAnswers;
  selectedAnswer: IAnswer | null = null;
  loading = true;
  formTitle: string = '';

  constructor(
    private readonly _questionService: QuestionService,
    private readonly _criteriaService: CriteriaService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const questionId: number = +this._route.snapshot.paramMap.get('id')!;
    this.questionAndAnswers = await this._questionService.getById(questionId);
    console.log(this.questionAndAnswers.question.check_required);
    this.formTitle = this._route.snapshot.paramMap.get('formTitle')!;
    this.loading = false;
  }

  async nextQuestion(): Promise<void> {
    if (this.questionAndAnswers.question.check_required === 0) {
      await this._criteriaService.updateCriteria(this.formTitle, this.selectedAnswer!.criteria_id);
      await this._router.navigate(['/question', this.formTitle, this.questionAndAnswers.question.next_question]);
    } else {
      const nextForm = await this._criteriaService.checkCriteria(this.formTitle, this.questionAndAnswers.question.check_required);
      console.log(nextForm);
    }
    location.reload();
  }
}
