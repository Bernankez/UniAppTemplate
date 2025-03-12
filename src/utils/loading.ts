export class LoadingController {
  private count: number
  #lastOption: UniNamespace.ShowLoadingOptions | undefined

  constructor() {
    this.count = 0
  }

  get isLoading() {
    return this.count > 0
  }

  show(option?: UniNamespace.ShowLoadingOptions) {
    if (this.count === 0) {
      uni.showLoading()
    }
    else if (option !== this.#lastOption) {
      uni.hideLoading()
      uni.showLoading(option)
      this.#lastOption = option
    }
    this.count++
  }

  hide() {
    this.count--
    if (this.count <= 0) {
      uni.hideLoading()
      this.count = 0
    }
  }

  hideAll() {
    uni.hideLoading()
    this.count = 0
  }
}
