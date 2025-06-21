// src/data/googleRouteExample.ts
import { GoogleRoute } from "@/types/map";

export const exampleRoute: GoogleRoute = {
  id_rota: "RIO-1750208097767",
  data_criacao: "2025-06-18T00:54:57.767Z",
  resumo: {
    distancia_total: {
      texto: "92,5 km",
      valor_metros: 92486,
    },
    duracao_total: {
      texto: "2 horas e 14 minutos",
      valor_segundos: 8063,
    },
  },
  paradas: [
    {
      sequencia: 1,
      tipo: "ORIGEM",
      nome: "Cristo Redentor",
      endereco:
        "Parque Nacional da Tijuca - Alto da Boa Vista, Rio de Janeiro - RJ",
      coordenadas: {
        lat: -22.951916,
        lng: -43.2104872,
      },
      percurso_proxima_parada: {
        distancia: {
          texto: "29,0 km",
          valor_metros: 29002,
        },
        duracao: {
          texto: "39 minutos",
          valor_segundos: 2368,
        },
        polyline:
          "`a|jCx|kiGbEhE|@dAx@v@f@^vIhE`@^Vh@p@hDb@fAdA`Cb@l@f@^`Af@`@^rDpGh@p@p@f@\\R|EjBf@\\x@z@f@`AtCbHb@pApBrJjAjF?FdAdFF|@V~E\\xAPb@d@n@\\^`ClBh@l@h@`ARZ@Db@pAT\\fC|C^j@t@~@fA{ALg@@OKmAFWNSh@WbGsAt@Q~Ao@p@c@fBiBh@eATs@~@uETm@Ve@l@s@tIsHjHwGd@w@Tm@^sBn@eE|BsM\\_Ab@q@hCiCxKiK|BuBtAuAt@q@z@o@bBeBj@u@`A{@`Ak@fAa@nAUnAEbHV|CLnThBhABtAO`AY~@c@fM}Hl@WlA]nAOlCG|GDRMDSDeDBeB^mFt@sErC_Of@_Dh@gCdBqJvAkH~EcWbA{EXoBNoD?_BMiBOcB{A_Mg@qDeAcJe@oEGsA[sCu@wFEmBJwBTsBVcAl@eB~@_B~@mA`QkRvAiA`Am@dBw@|F_BlGcB~e@uMtB}@`BcAhA_Az@}@dDyDnBsB`LcNnEuFdI{JbAcB~AeDx@oAbAqA`AqAvDuEh@w@nKsMpBiCxBmCt@oAv@eBh@cB\\eBxBsNdAaHfAcIrBeNZeCb@iC@c@xJgq@zCmSjByMr@kEpH{g@pEeZvEm[zCiTHkBEoNAoDH_CPmB^cCn@cCp@kBnAcCbF_Jb@eA`@iBh@{CnBcKLiAF}AD_GD{@PoAf@gBh@sAhDaJbDoHrBmFbAsCr@cCfAkEr@}Cd@mCb@qEB_@DsEHsBx@mM`@aGRkBViB~AuHHOb@mDz@wEFSnAaHJ_A`CeM|DeThC_N\\qBdAuH\\yCVyC^yGL{HCoD[aHa@uGYwC_AyHQeADaBCe@Mm@_@iC{AcJMkA_@eBcAkGIcAYaA_@qCWuAQk@[oB?KcBkJLO`CmAXSxHcEjAi@nAg@NJRETQBMR[NMdSiIxDgB|KqFhEmB~DkB~Aq@PErAo@f@[Rq@AKGIoAiH]eAU]",
      },
    },
    {
      sequencia: 2,
      tipo: "PARADA_INTERMEDIARIA",
      nome: "Pão de Açúcar",
      endereco: "Av. Pasteur, 520 - Urca, Rio de Janeiro - RJ",
      coordenadas: {
        lat: -22.9496034,
        lng: -43.1572284,
      },
      percurso_proxima_parada: {
        distancia: {
          texto: "17,4 km",
          valor_metros: 17362,
        },
        duracao: {
          texto: "28 minutos",
          valor_segundos: 1680,
        },
        polyline:
          "GUy@kAuBoCkAcBmBsDUEKDCT^z@fAlBsAhA`BxBsBsC_BsCq@yAmAoDa@uAcG}WdBm@RDJGDOa@iBmBgI}AuGw@aDqAqGqJml@k@oCUuAaCoN}DaXeE_^iCmUiBaToAeKaCwPw@gH}B}VKmB_@_EcAeNsCs]sAqQa@iFmA_OgB}Uu@qKUwBk@uHU{DkBcb@WaLiBqe@mAaVe@uLIiBDSe@}KGuEMaGMmIo@wa@IyJe@iYE{ECwHBs@Ao@MuC?aDCm@A{LC_ABaAPwZHcVXcQRwJAGVwNf@wMLuDVgFX_FjByVV}C`AkGLm@jBaMLuAJqBdEaY@]k@k@OKkBoDyDoHoBkDSc@Ck@Jc@VuB?UAKzSwMA_@[ROs@AG?{@oG{@hCwUjAOJMqAsUK]OOyASG?k@IKQ]A]Fg@lAq@tBq@pA}AlC{@pAkBfDARsBjDoAtAkA~@yCjB_BjA}@h@}@r@]^U^Qb@Sx@Kx@IrAa@bOc@`ESpCSfGW`Dg@tJH~CAdCAr@UjB_A`FiBxFm@zAGZwCtJ_@|AgBrFkCbJw@lCyCvJYhAqCfJo@lDMx@O`CQlGO~F?^UpJGdBCzAErAEd@MtDSzSGbK?lBG~AShg@ErGClPGrIGfAEnIDzND|AJbCFrE@xBDtACzLFfGHzEl@fwAHp_@EpDCjC@t@q@r}@a@hS[b_@B|GLjH\\dHf@zHr@fHvA~J^~BzAhH@JtDdPh@lBbGlWfAbF~AnGn@zCPlAhA~FJv@vEdXv@vF`AzFxAzIZvBnCpO|Fb^dFf[nGh`@FJPjANt@Fl@lCrPRfAr@xEp@~DtChQt@|EXnAbAxGvDxU|CzQh@xD`@pB~B`OjA`HNrApBrLJf@FFxCxQHpAh@~Bj@bFb@|EDbBPzCRjGBxDIdD_@zJMtBQxBe@jEe@tC{BdL]pAsA`EU~@YhB]pEWlBwClP{@lFsA`HM|@m@dCEd@yAhIi@pD_@~DcAvNU",
      },
    },
    {
      sequencia: 3,
      tipo: "PARADA_INTERMEDIARIA",
      nome: "Estádio do Maracanã",
      endereco:
        "Av. Pres. Castelo Branco, Portão 3 - Maracanã, Rio de Janeiro - RJ",
      coordenadas: {
        lat: -22.9121329,
        lng: -43.2301388,
      },
      percurso_proxima_parada: {
        distancia: {
          texto: "46,1 km",
          valor_metros: 46122,
        },
        duracao: {
          texto: "1 hora e 7 minutos",
          valor_segundos: 4015,
        },
        polyline:
          "hEArGOpAIh@aBpG_BrF_CbHkBdF}InUc@|AQnAGnAG~IObByCdPQx@c@bAkEtHk@pAs@tAq@dBs@dCi@tCQpBEjAChCDdJBnFK|BMlA_D|SiDtUk@`Dk@lCkA|IGZYvCS~@S~Au@zEg@nD_AjGg@nDo@|De@nDyDlWiLfw@q@vDm@hD{AlKa@tDiAbIyF|_@a@rBo@nBi@nAyAvBiBrBaAfAyClEq@R]A[KQQGMGa@?sALOF[Ag@Ma@e@_@YG]DYLKHQ?a@Lk@BiAM_@SSQYm@GOGq@?yAEcBAIKWY[WQeBi@m@KeAE{EFgAG}CYc@?u@NsBh@g@Ag@OeKsHiDcCwL}HaB{@i@Ma@KQKQWUa@SK_@Cc@FWXIXIf@KXk@d@cAbBsA|BQRk@\\s@N_I~@g@A{B]eAIMEiFk@M@_MoAsFm@}D]q@CaA@{H|@]Jo@^{AvAm@Ve@Fo@CiFaAy@Qk@YQOm@u@yEoIWo@O}@IkBQcCc@iAcFkJsA_Dy@qBe@e@k@YsMqDe@WcBaBw@eA_C}E[i@aAwCU[_@We@OUCcMKgAQeA_@w@g@wBiBe@_@k@Uq@OaAEmABy@Lu@ZsI|Du@L}BN_@EiCmAm@Ok@AiBJ_CX}@Ce@Kw@a@oAy@k@W}B_@kCw@aACs@DsEn@g@N}@\\a@VkBv@y@Nq@MqC_AaE{AcCy@qAWuAOqAGqB?cAIaAYw@[kEmAkA[uFkA_CQ}Dk@u@Wa@]eBuB}AcAq@_@GGeHiEu@m@i@w@cGkLWg@Mo@QiBu@iEoBkHe@{@k@q@yBmBwBkCYU_@Qm@IoAqAS_@k@{B_@o@g@a@gAq@cBk@gEeAcDmAyAu@iCeBk@a@yC_Do@}@wAmCi@kBYqAM_Aa@qDKQKCK?gBfAm@d@]d@w@tAwCjEOb@UnAWj@[XeBtA}Al@MBGJi@Rm@ZwH|CmGhCaAqAGKgDxEu@lAi@NK?wFsEWDoBh@aATZfEHl@fAnA",
      },
    },
    {
      sequencia: 4,
      tipo: "DESTINO",
      nome: "Praia de Copacabana",
      endereco: "Posto 4, Av. Atlântica, Rio de Janeiro - RJ",
      coordenadas: {
        lat: -22.9712952,
        lng: -43.1825988,
      },
      percurso_proxima_parada: null,
    },
  ],
};
