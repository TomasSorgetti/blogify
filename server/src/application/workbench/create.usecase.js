import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class CreateWorkbenchUseCase extends UseCaseContract {
  #workbenchRepository;
  #workbenchFactory;

  constructor({ workbenchRepository, workbenchFactory }) {
    super();
    this.#workbenchRepository = workbenchRepository;
    this.#workbenchFactory = workbenchFactory;
  }

  async execute({ userId, name, description }) {
    const workbenchEntity = this.#workbenchFactory.create({
      name,
      owner: userId,
      description,
    });

    const rawWorkbench = await this.#workbenchRepository.create(
      workbenchEntity.toObject(),
    );

    return rawWorkbench;
  }
}
