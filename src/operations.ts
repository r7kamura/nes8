import IOperation from "./IOperation";

const operations: Array<IOperation | null> = [
  {
    addressingMode: "implied",
    cycle: 7,
    fullName: "BRK",
    name: "BRK"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "ORA_INDX",
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    fullName: "SLO_INDX",
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "ORA_ZERO",
    name: "ORA"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "ASL_ZERO",
    name: "ASL"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "SLO_ZERO",
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    fullName: "PHP",
    name: "PHP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "ORA_IMM",
    name: "ORA"
  },
  {
    addressingMode: "accumulator",
    cycle: 2,
    fullName: "ASL",
    name: "ASL"
  },
  null,
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPI",
    name: "NOPI"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "ORA_ABS",
    name: "ORA"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "ASL_ABS",
    name: "ASL"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "SLO_ABS",
    name: "SLO"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    fullName: "BPL",
    name: "BPL"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    fullName: "ORA_INDY",
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    fullName: "SLO_INDY",
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "ORA_ZEROX",
    name: "ORA"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "ASL_ZEROX",
    name: "ASL"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "SLO_ZEROX",
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "CLC",
    name: "CLC"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "ORA_ABSY",
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 7,
    fullName: "SLO_ABSY",
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPI",
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "ORA_ABSX",
    name: "ORA"
  },
  {
    addressingMode: "absolute_x",
    cycle: 6,
    fullName: "ASL_ABSX",
    name: "ASL"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    fullName: "SLO_ABSX",
    name: "SLO"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "JSR_ABS",
    name: "JSR"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "AND_INDX",
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    fullName: "RLA_INDX",
    name: "RLA"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "BIT_ZERO",
    name: "BIT"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "AND_ZERO",
    name: "AND"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "ROL_ZERO",
    name: "ROL"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "RLA_ZERO",
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "PLP",
    name: "PLP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "AND_IMM",
    name: "AND"
  },
  {
    addressingMode: "accumulator",
    cycle: 2,
    fullName: "ROL",
    name: "ROL"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "BIT_ABS",
    name: "BIT"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "AND_ABS",
    name: "AND"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "ROL_ABS",
    name: "ROL"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "RLA_ABS",
    name: "RLA"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    fullName: "BMI",
    name: "BMI"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    fullName: "AND_INDY",
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    fullName: "RLA_INDY",
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "AND_ZEROX",
    name: "AND"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "ROL_ZEROX",
    name: "ROL"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "RLA_ZEROX",
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "SEC",
    name: "SEC"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "AND_ABSY",
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 7,
    fullName: "RLA_ABSY",
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPI",
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "AND_ABSX",
    name: "AND"
  },
  {
    addressingMode: "absolute_x",
    cycle: 6,
    fullName: "ROL_ABSX",
    name: "ROL"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    fullName: "RLA_ABSX",
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 6,
    fullName: "RTI",
    name: "RTI"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "EOR_INDX",
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    fullName: "SRE_INDX",
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "EOR_ZERO",
    name: "EOR"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "LSR_ZERO",
    name: "LSR"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "SRE_ZERO",
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    fullName: "PHA",
    name: "PHA"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "EOR_IMM",
    name: "EOR"
  },
  {
    addressingMode: "accumulator",
    cycle: 2,
    fullName: "LSR",
    name: "LSR"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 3,
    fullName: "JMP_ABS",
    name: "JMP"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "EOR_ABS",
    name: "EOR"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "LSR_ABS",
    name: "LSR"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "SRE_ABS",
    name: "SRE"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    fullName: "BVC",
    name: "BVC"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    fullName: "EOR_INDY",
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    fullName: "SRE_INDY",
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "EOR_ZEROX",
    name: "EOR"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "LSR_ZEROX",
    name: "LSR"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "SRE_ZEROX",
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "CLI",
    name: "CLI"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "EOR_ABSY",
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 7,
    fullName: "SRE_ABSY",
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPI",
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "EOR_ABSX",
    name: "EOR"
  },
  {
    addressingMode: "absolute_x",
    cycle: 6,
    fullName: "LSR_ABSX",
    name: "LSR"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    fullName: "SRE_ABSX",
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 6,
    fullName: "RTS",
    name: "RTS"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "ADC_INDX",
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    fullName: "RRA_INDX",
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "ADC_ZERO",
    name: "ADC"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "ROR_ZERO",
    name: "ROR"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "RRA_ZERO",
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "PLA",
    name: "PLA"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "ADC_IMM",
    name: "ADC"
  },
  {
    addressingMode: "accumulator",
    cycle: 2,
    fullName: "ROR",
    name: "ROR"
  },
  null,
  {
    addressingMode: "indirect_absolute",
    cycle: 5,
    fullName: "JMP_INDABS",
    name: "JMP"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "ADC_ABS",
    name: "ADC"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "ROR_ABS",
    name: "ROR"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "RRA_ABS",
    name: "RRA"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    fullName: "BVS",
    name: "BVS"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    fullName: "ADC_INDY",
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    fullName: "RRA_INDY",
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "ADC_ZEROX",
    name: "ADC"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "ROR_ZEROX",
    name: "ROR"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "RRA_ZEROX",
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "SEI",
    name: "SEI"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "ADC_ABSY",
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 7,
    fullName: "RRA_ABSY",
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPI",
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "ADC_ABSX",
    name: "ADC"
  },
  {
    addressingMode: "absolute_x",
    cycle: 6,
    fullName: "ROR_ABSX",
    name: "ROR"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    fullName: "RRA_ABSX",
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "STA_INDX",
    name: "STA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "SAX_INDX",
    name: "SAX"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "STY_ZERO",
    name: "STY"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "STA_ZERO",
    name: "STA"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "STX_ZERO",
    name: "STX"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "SAX_ZERO",
    name: "SAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "DEY",
    name: "DEY"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "TXA",
    name: "TXA"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "STY_ABS",
    name: "STY"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "STA_ABS",
    name: "STA"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "STX_ABS",
    name: "STX"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "SAX_ABS",
    name: "SAX"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    fullName: "BCC",
    name: "BCC"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 6,
    fullName: "STA_INDY",
    name: "STA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  null,
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "STY_ZEROX",
    name: "STY"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "STA_ZEROX",
    name: "STA"
  },
  {
    addressingMode: "zero_page_y",
    cycle: 4,
    fullName: "STX_ZEROY",
    name: "STX"
  },
  {
    addressingMode: "zero_page_y",
    cycle: 4,
    fullName: "SAX_ZEROY",
    name: "SAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "TYA",
    name: "TYA"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "STA_ABSY",
    name: "STA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "TXS",
    name: "TXS"
  },
  null,
  null,
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "STA_ABSX",
    name: "STA"
  },
  null,
  null,
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "LDY_IMM",
    name: "LDY"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "LDA_INDX",
    name: "LDA"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "LDX_IMM",
    name: "LDX"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "LAX_INDX",
    name: "LAX"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "LDY_ZERO",
    name: "LDY"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "LDA_ZERO",
    name: "LDA"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "LDX_ZERO",
    name: "LDX"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "LAX_ZERO",
    name: "LAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "TAY",
    name: "TAY"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "LDA_IMM",
    name: "LDA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "TAX",
    name: "TAX"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "LDY_ABS",
    name: "LDY"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "LDA_ABS",
    name: "LDA"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "LDX_ABS",
    name: "LDX"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "LAX_ABS",
    name: "LAX"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    fullName: "BCS",
    name: "BCS"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    fullName: "LDA_INDY",
    name: "LDA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    fullName: "LAX_INDY",
    name: "LAX"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "LDY_ZEROX",
    name: "LDY"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "LDA_ZEROX",
    name: "LDA"
  },
  {
    addressingMode: "zero_page_y",
    cycle: 4,
    fullName: "LDX_ZEROY",
    name: "LDX"
  },
  {
    addressingMode: "zero_page_y",
    cycle: 4,
    fullName: "LAX_ZEROY",
    name: "LAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "CLV",
    name: "CLV"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "LDA_ABSY",
    name: "LDA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "TSX",
    name: "TSX"
  },
  null,
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "LDY_ABSX",
    name: "LDY"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "LDA_ABSX",
    name: "LDA"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "LDX_ABSY",
    name: "LDX"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "LAX_ABSY",
    name: "LAX"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "CPY_IMM",
    name: "CPY"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "CMP_INDX",
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    fullName: "DCP_INDX",
    name: "DCP"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "CPY_ZERO",
    name: "CPY"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "CMP_ZERO",
    name: "CMP"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "DEC_ZERO",
    name: "DEC"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "DCP_ZERO",
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "INY",
    name: "INY"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "CMP_IMM",
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "DEX",
    name: "DEX"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "CPY_ABS",
    name: "CPY"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "CMP_ABS",
    name: "CMP"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "DEC_ABS",
    name: "DEC"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "DCP_ABS",
    name: "DCP"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    fullName: "BNE",
    name: "BNE"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    fullName: "CMP_INDY",
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    fullName: "DCP_INDY",
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "CMP_ZEROX",
    name: "CMP"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "DEC_ZEROX",
    name: "DEC"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "DCP_ZEROX",
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "CLD",
    name: "CLD"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "CMP_ABSY",
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 2,
    fullName: "DCP_ABSY",
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPI",
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "CMP_ABSX",
    name: "CMP"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    fullName: "DEC_ABSX",
    name: "DEC"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    fullName: "DCP_ABSX",
    name: "DCP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "CPX_IMM",
    name: "CPX"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    fullName: "SBC_INDX",
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    fullName: "ISB_INDX",
    name: "ISB"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "CPX_ZERO",
    name: "CPX"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    fullName: "SBC_ZERO",
    name: "SBC"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "INC_ZERO",
    name: "INC"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    fullName: "ISB_ZERO",
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "INX",
    name: "INX"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "SBC_IMM",
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    fullName: "SBC_IMM",
    name: "SBC"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "CPX_ABS",
    name: "CPX"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    fullName: "SBC_ABS",
    name: "SBC"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "INC_ABS",
    name: "INC"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    fullName: "ISB_ABS",
    name: "ISB"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    fullName: "BEQ",
    name: "BEQ"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    fullName: "SBC_INDY",
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    fullName: "ISB_INDY",
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPD",
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    fullName: "SBC_ZEROX",
    name: "SBC"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "INC_ZEROX",
    name: "INC"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    fullName: "ISB_ZEROX",
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "SED",
    name: "SED"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    fullName: "SBC_ABSY",
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    fullName: "NOP",
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 2,
    fullName: "ISB_ABSY",
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    fullName: "NOPI",
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    fullName: "SBC_ABSX",
    name: "SBC"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    fullName: "INC_ABSX",
    name: "INC"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    fullName: "ISB_ABSX",
    name: "ISB"
  }
];

export default operations;
