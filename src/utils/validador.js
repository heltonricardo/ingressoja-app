function imagemIsValida(file) {
  const regex = /.+\.(bmp|jpe?g|png)$/;
  return regex.test(file?.name) && file?.size <= 2000000;
}

export { imagemIsValida };
