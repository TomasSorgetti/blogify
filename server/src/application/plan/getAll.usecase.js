import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class getAllPlansUseCase extends UseCaseContract {
  #planRepository;

  constructor({ planRepository }) {
    super();
    this.#planRepository = planRepository;
  }

  async execute() {
    //   todo => use caché
    return await this.#planRepository.findAllActive();
  }
}
