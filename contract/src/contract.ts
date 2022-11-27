// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedMap } from 'near-sdk-js';
import { assert, STORAGE_QUESTION } from './utils';
import { Question, Answer, User } from './models';

@NearBindgen({})
class FilePathContract {

  questions = new UnorderedMap<string>('');
  answers = new UnorderedMap<String>('');
  counter: number;

  // predecessor
  @call({ payableFunction: true })
  makeQuestion({ question }: { question: string }) {

    let questioner = near.predecessorAccountId();

    let questionFee = near.attachedDeposit() as bigint;

    assert(questionFee === STORAGE_QUESTION, `Tienes que depositar .1 NEAR`);

    this.questions.set(questioner, question);

  }

  @call({ payableFunction: true })
  makeAnswer({ answer }: { answer: string }) {

    let answerer = near.predecessorAccountId();

    let questionFee = near.attachedDeposit() as bigint;

    assert(questionFee === STORAGE_QUESTION, `Tienes que depositar .1 NEAR`);

    this.answers.set(answerer, answer);
  }

  @view({})
  get_questions({ start_index = 0, limit = 20 }: { start_index: number, limit: number }): Question[] {

    let questions: Question[] = [];

    let end = Math.min(limit, this.questions.length);

    for (let i = 0; i < end; i++) {
      const account_id = this.questions.keys.get(i) as string;
      const question = this.get_questions_for_account({ account_id });

      questions.push(question);
    }

    return questions;
  }

  @view({})
  get_questions_for_account({ account_id }: { account_id: string }): Question {
    return {
      body: this.questions.get(account_id).toString(),
      user: account_id,
    }
  }

  @view({})
  get_answers({ start_index = 0, limit = 20 }: { start_index: number, limit: number }): Answer[] {

    let answers: Answer[] = [];

    let end = Math.min(limit, this.questions.length);

    for (let i = 0; i < end; i++) {
      const account_id = this.answers.keys.get(i) as string;
      const answer = this.get_answers_for_account({ account_id });

      answers.push(answer);
    }

    return answers;

  }

  @view({})
  get_answers_for_account({ account_id }): Answer {
    return {
      body: this.answers.get(account_id).toString(),
      user: account_id,
    }
  }

}