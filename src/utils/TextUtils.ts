export class TextUtils {
  static getTruncatedText(text: string, maxWidth: number, ctx: CanvasRenderingContext2D): string {
    let textWidth = ctx.measureText(text).width;
    const ellipsis = '...';
    const ellipsisWidth = ctx.measureText(ellipsis).width;

    if (textWidth <= maxWidth) {
      return text;
    }

    // If text is too wide, truncate and add ellipsis
    let truncatedText = text;
    while (textWidth >= maxWidth - ellipsisWidth && truncatedText.length > 0) {
      truncatedText = truncatedText.substring(0, truncatedText.length - 1);
      textWidth = ctx.measureText(truncatedText).width;
    }

    return truncatedText + ellipsis;
  }
}