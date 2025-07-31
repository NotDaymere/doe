const latexDictionary: { [key: string]: string } = {
  '^': '\^',
  '*': '\\cdot',
  '/': '/',
  'sqrt': '\\sqrt',
  '√': '\\sqrt',
  'sin': '\\sin',
  'cos': '\\cos',
  'tan': '\\tan',
  'log': '\\log',
  'ln': '\\ln',
  'pi': '\\pi',
  'θ': '\\theta',
  'alpha': '\\alpha',
  'β': '\\beta',
  'γ': '\\gamma',
  'sum': '\\sum',
  'int': '\\int',
  '!=': '\\neq',
  '>=': '\\geq',
  '<=': '\\leq',
  '->': '\\to',
  '=>': '\\Rightarrow',
  'inf': '\\infty',
  '∞': '\\infty',
  'lim': '\\lim',
  'det': '\\det',
  'exp': '\\exp',
  'mod': '\\mod',
  'deg': '\\degree',
  '+/-': '\\pm',
  '±': '\\pm',
  'cdot': '\\cdot',
  'times': '\\times',
  'div': '\\div',
  'approx': '\\approx',
  '~': '\\sim',
};

// Расширенные регулярные выражения для распознавания конструкций
const patterns = {
  // Степень: x^2, x^(-1), x^{n+1}, e^(-1)
  power: /(?:(\w+|\{[^}]*\}|\([^)]*\))\^([-]?\w+|\{[^}]*\}|\([^)]*\)))/g,
  // Корень: sqrt 11, sqrt(x), √x, sqrt{x+1}
  sqrt: /(?:sqrt|√)\s*(\w+|\{[^}]*\}|\([^)]*\))/g,
  // Дробь: 1/2, a/b, (x+1)/(y-1)
  fraction: /(?:(\w+|\{[^}]*\}|\([^)]*\))\s*\/\s*(\w+|\{[^}]*\}|\([^)]*\)))/g,
  // Индекс: x_1, x_n, x_{n+1}
  subscript: /(?:(\w+|\{[^}]*\})_(?:\w+|\{[^}]*\}|\([^)]*\)))/g,
  // Сумма: sum i=0 to n, sum_{i=0}^{n}
  sum: /(?:sum\s+(\w+)\s*=\s*(\S+)\s+to\s+(\S+))/g,
  // Интеграл: int x=0 to 1, int_{0}^{1}
  integral: /(?:int\s+(\w+)\s*=\s*(\S+)\s+to\s+(\S+))/g,
  // Предел: lim x->0
  limit: /(?:lim\s+(\w+)\s*->\s*(\S+))/g,
  // Функции: sin x, cos(x), ln x, sinx
  function: /(sin|cos|tan|log|ln|exp|det)\s*(\w+|\{[^}]*\}|\([^)]*\)|(?=\w+\b))/g,
  // Матрицы: [[1,2],[3,4]]
  matrix: /(?:\[\[([^\]]*)\](?:,\[([^\]]*)\])*\])/g,
  // Скобки: (x+1) -> {x+1} для LaTeX
  parentheses: /\(([^()]+)\)/g,
  // Unicode-символы и пробелы
  cleanup: /\s+/g,
};

// Сервис для преобразования текстового ввода в LaTeX
export class TextToLatexService {
  /**
   * Преобразует текстовое математическое выражение в LaTeX
   * @param input - строка с пользовательским вводом (например, "x^2", "√11", "1/2")
   * @returns строка с LaTeX-кодом
   */
  public static convert(input: string): string {
    try {
      // Проверяем, является ли выражение пустым
      if (!input.trim()) {
        return '\\(\\text{Пустой ввод}\\)';
      }

      let result = input.trim();

      // 1. Замена символов из словаря
      for (const [key, value] of Object.entries(latexDictionary)) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKey}\\b`, 'g');
        result = result.replace(regex, value);
      }

      // 2. Рекурсивная обработка вложенных выражений
      const processNested = (str: string, depth = 0): string => {
        if (depth > 10) return str; // Защита от бесконечной рекурсии

        // Обработка скобок: (x+1) -> {x+1}
        str = str.replace(patterns.parentheses, (match, content) => `{${processNested(content, depth + 1)}}`);

        // Обработка степеней
        str = str.replace(patterns.power, (match, base, exp) => {
          const cleanBase = base.startsWith('{') || base.startsWith('(') ? base : `{${base}}`;
          const cleanExp = exp.startsWith('{') || exp.startsWith('(') || exp.startsWith('-') ? exp : `{${exp}}`;
          return `${cleanBase}^{${cleanExp}}`;
        });

        // Обработка корней
        str = str.replace(patterns.sqrt, (match, arg) => {
          const cleanArg = arg.startsWith('{') || arg.startsWith('(') ? arg : `{${arg}}`;
          return `\\sqrt${cleanArg}`;
        });

        // Обработка дробей
        str = str.replace(patterns.fraction, (match, num, denom) => {
          const cleanNum = num.startsWith('{') || num.startsWith('(') ? num : `{${num}}`;
          const cleanDenom = denom.startsWith('{') || denom.startsWith('(') ? denom : `{${denom}}`;
          return `\\frac${cleanNum}${cleanDenom}`;
        });

        // Обработка индексов
        str = str.replace(patterns.subscript, (match, base, sub) => {
          const cleanSub = sub.startsWith('{') || sub.startsWith('(') ? sub : `{${sub}}`;
          return `${base}_{${cleanSub}}`;
        });

        // Обработка сумм
        str = str.replace(patterns.sum, (match, index, start, end) => {
          return `\\sum_{${index}=${start}}^{${end}}`;
        });

        // Обработка интегралов
        str = str.replace(patterns.integral, (match, variable, start, end) => {
          return `\\int_{${start}}^{${end}}`;
        });

        // Обработка пределов
        str = str.replace(patterns.limit, (match, variable, value) => {
          return `\\lim_{${variable}\\to${value}}`;
        });

        // Обработка функций
        str = str.replace(patterns.function, (match, func, arg = '') => {
          const cleanArg = arg.startsWith('{') || arg.startsWith('(') ? arg : `{${arg}}`;
          return `\\${func}${cleanArg}`;
        });

        // Обработка матриц
        str = str.replace(patterns.matrix, (match, ...rows) => {
          const matrixRows = rows
            .filter(row => row)
            .map((row: string) => row.split(',').join(' & '))
            .join(' \\\\ ');
          return `\\begin{matrix}${matrixRows}\\end{matrix}`;
        });

        return str;
      };

      // 3. Рекурсивная обработка ввода
      result = processNested(result);

      // 4. Очистка лишних пробелов
      result = result.replace(patterns.cleanup, ' ');

      // 5. Добавляем inline-обрамление, если это не display-выражение
      const isInline = !result.startsWith('\\[') && !result.startsWith('$$');
      return isInline ? `($${result}$)` : result;
    } catch (error) {
      // Возвращаем частично обработанный результат вместо ошибки
      return `($text{parsing error: ${input}}$)`;
    }
  }
}