// Los archivos .yaml se importan como texto (ver "loader" en angular.json)
declare module '*.yaml' {
  const content: string;
  export default content;
}
