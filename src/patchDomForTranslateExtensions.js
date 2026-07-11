
if (typeof Node === "function" && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;

  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[patchDomForTranslateExtensions] Se evitó un removeChild inválido (probablemente causado por una extensión de traducción del navegador).",
          { parent: this, child }
        );
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;

  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[patchDomForTranslateExtensions] Se evitó un insertBefore inválido (probablemente causado por una extensión de traducción del navegador).",
          { parent: this, referenceNode, newNode }
        );
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}