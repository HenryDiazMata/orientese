// ==========================================
// MANUTENCAO.JSX
// LISTADO DE SOLICITUDES (NO ES DIRECTORIO DE TECNICOS)
// TIPO PERSONA = DEL CLIENTE DE LA SOLICITUD
// PEDIDO = SolicitarManutencao.jsx
// CadastroManutencao QUEDA EN EL HUB DE REGISTRO DE TECNICO — NO TOCAR
// MOCKS = src/data/drones/manutencao.json
// ==========================================

import React, { useState, useMemo, useEffect } from "react";
import SolicitarManutencao from "../../components/drones/formularios/SolicitarManutencao";
import SOLICITACOES_MOCK from "../../data/drones/manutencao.json";

// BETA: PEDIDOS DEL NAVEGADOR. NO ES BASE NI ARCHIVO DEL REPO
const STORAGE_KEY = "drones.manutencao.solicitacoes.beta";

function normalizarTipoPersona(valor) {
  const t = String(valor || "").toLowerCase().trim();
  if (t === "juridica" || t === "jurídica" || t === "pj") return "juridica";
  return "fisica";
}

function lerPedidosLocais() {
  try {
    const bruto = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(bruto)) return [];
    return bruto.map((item) => ({
      ...item,
      tipoPersona: normalizarTipoPersona(item.tipoPersona),
      origem: "local"
    }));
  } catch (e) {
    return [];
  }
}

function gravarPedidosLocais(lista) {
  try {
    const soLocais = (lista || []).filter((item) => item.origem === "local");
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(soLocais));
  } catch (e) {
    /* SIN STORAGE */
  }
}

export default function Manutencao({
  openFormOnMount = false,
  onFormOpened,
}) {
  const [activeTab, setActiveTab] = useState("lista");
  const [solicitacaoSucesso, setSolicitacaoSucesso] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [urgenciaFiltro, setUrgenciaFiltro] = useState("");
  const [filtroTipoPersona, setFiltroTipoPersona] = useState("TODOS");

  const [solicitacoes, setSolicitacoes] = useState(() => {
    const mocks = (SOLICITACOES_MOCK || []).map((item) => ({
      ...item,
      tipoPersona: normalizarTipoPersona(item.tipoPersona),
      origem: "mock"
    }));
    return [...lerPedidosLocais(), ...mocks];
  });

  useEffect(() => {
    if (openFormOnMount) {
      setActiveTab("pedir");
      if (onFormOpened) onFormOpened();
    }
  }, [openFormOnMount, onFormOpened]);

  const hayFiltrosActivos =
    searchTerm.trim() !== "" ||
    selectedEstado !== "" ||
    selectedCategoria !== "" ||
    urgenciaFiltro !== "" ||
    filtroTipoPersona !== "TODOS";

  const handleLimparFiltros = () => {
    setSearchTerm("");
    setSelectedEstado("");
    setSelectedCategoria("");
    setUrgenciaFiltro("");
    setFiltroTipoPersona("TODOS");
  };

  const handleSuccessCadastro = (novoRegistro) => {
    const registroFormatado = {
      ...novoRegistro,
      tipoPersona: normalizarTipoPersona(novoRegistro.tipoPersona),
      id: Date.now(),
      data: new Date().toISOString().split("T")[0],
      orcamentosRecebidos: 0,
      origem: "local"
    };
    const proxima = [registroFormatado, ...solicitacoes];
    setSolicitacoes(proxima);
    gravarPedidosLocais(proxima);
    setSolicitacaoSucesso(true);
    setTimeout(() => {
      setSolicitacaoSucesso(false);
      setActiveTab("lista");
    }, 2000);
  };

  const solicitacoesFiltradas = useMemo(() => {
    return solicitacoes.filter((item) => {
      const matchSearch =
        (item.titulo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.equipamento || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.descricao || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.cliente || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchEstado = selectedEstado ? item.estado === selectedEstado : true;
      const matchCategoria = selectedCategoria ? item.categoria === selectedCategoria : true;
      const matchUrgencia = urgenciaFiltro ? item.urgencia === urgenciaFiltro : true;
      const tipo = normalizarTipoPersona(item.tipoPersona);
      const matchTipo = filtroTipoPersona === "TODOS" || tipo === filtroTipoPersona;

      return matchSearch && matchEstado && matchCategoria && matchUrgencia && matchTipo;
    });
  }, [solicitacoes, searchTerm, selectedEstado, selectedCategoria, urgenciaFiltro, filtroTipoPersona]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "24px"
      }}>
        <div style={{ textAlign: "left" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
            Manutenção de Drones
          </h1>
          <p style={{ color: "#64748b", fontSize: 15, margin: "6px 0 0 0" }}>
            Solicitações de manutenção. O tipo de pessoa é do cliente do pedido, não um técnico.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setActiveTab("lista")}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: activeTab === "lista" ? "#2563eb" : "#e2e8f0",
            color: activeTab === "lista" ? "#ffffff" : "#334155"
          }}
        >
          🔍 Buscar Serviços Solicitados
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pedir")}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: activeTab === "pedir" ? "#2563eb" : "#e2e8f0",
            color: activeTab === "pedir" ? "#ffffff" : "#334155"
          }}
        >
          🛠️ Solicitar Manutenção
        </button>
        </div>
      </div>

      {activeTab === "lista" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginBottom: "12px",
              backgroundColor: "#ffffff",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0"
            }}
          >
            <select
              value={filtroTipoPersona}
              onChange={(e) => setFiltroTipoPersona(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}
              aria-label="Tipo de pessoa do cliente"
            >
              <option value="TODOS">Tipo de pessoa (cliente)</option>
              <option value="fisica">Cliente pessoa física</option>
              <option value="juridica">Cliente pessoa jurídica</option>
            </select>

            <input
              type="text"
              placeholder="Buscar por equipo, cliente ou falla..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1"
              }}
            />

            <select
              value={selectedEstado}
              onChange={(e) => setSelectedEstado(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}
            >
              <option value="">Todos os Estados</option>
              <option value="SP">São Paulo (SP)</option>
              <option value="PR">Paraná (PR)</option>
              <option value="RJ">Rio de Janeiro (RJ)</option>
              <option value="MG">Minas Gerais (MG)</option>
            </select>

            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}
            >
              <option value="">Todas as Categorias</option>
              <option value="Preventiva">Preventiva</option>
              <option value="Corretiva">Corretiva</option>
              <option value="Calibração">Calibração</option>
            </select>

            <select
              value={urgenciaFiltro}
              onChange={(e) => setUrgenciaFiltro(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}
            >
              <option value="">Qualquer Urgência</option>
              <option value="Alta">Alta</option>
              <option value="Media">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={handleLimparFiltros}
              disabled={!hayFiltrosActivos}
              style={{
                background: "none",
                border: "none",
                color: hayFiltrosActivos ? "#C46B6B" : "#94a3b8",
                cursor: hayFiltrosActivos ? "pointer" : "default",
                fontWeight: 600,
                fontSize: 13
              }}
            >
              Limpar Filtros
            </button>
          </div>

          {solicitacoesFiltradas.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "40px" }}>
              Nenhuma solicitação encontrada com os filtros selecionados.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px"
              }}
            >
              {solicitacoesFiltradas.map((item) => {
                const tipo = normalizarTipoPersona(item.tipoPersona);
                return (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: 6 }}>
                      <span
                        style={{
                          backgroundColor: "#dbeafe",
                          color: "#1e40af",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        {item.categoria}
                      </span>
                      <span
                        style={{
                          backgroundColor: tipo === "juridica" ? "#e0f2fe" : "#f1f5f9",
                          color: tipo === "juridica" ? "#0369a1" : "#475569",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: 700
                        }}
                      >
                        {tipo === "juridica" ? "Cliente PJ" : "Cliente PF"}
                      </span>
                      {item.origem === "local" && (
                        <span style={{
                          backgroundColor: "#EAF7FC",
                          color: "#1A8FD0",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: 700
                        }}>
                          Beta — neste navegador
                        </span>
                      )}
                      <span
                        style={{
                          backgroundColor: item.urgencia === "Alta" ? "#fee2e2" : "#fef3c7",
                          color: item.urgencia === "Alta" ? "#991b1b" : "#92400e",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        Urgência {item.urgencia}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "8px" }}>
                      {item.titulo}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "4px" }}>
                      👤 {item.cliente}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "4px" }}>
                      📍 {item.cidade} - {item.estado}
                    </p>
                    <p style={{ fontSize: "0.95rem", fontWeight: "500", marginBottom: "12px" }}>
                      🛸 {item.equipamento}
                    </p>

                    <p style={{ fontSize: "0.9rem", lineHeight: "1.4", marginBottom: "15px" }}>
                      {item.descricao}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px", marginTop: "10px" }}>
                    {String(item.contatoWhatsApp || "").replace(/\D/g, "") ? (
                      <a
                        href={`https://wa.me/55${String(item.contatoWhatsApp || "").replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                        style={{
                          display: "block",
                          textAlign: "center",
                          backgroundColor: "#16a34a",
                          color: "#ffffff",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: "bold"
                        }}
                      >
                        Enviar Orçamento pelo WhatsApp
                      </a>
                    ) : (
                      <span style={{ display: "block", textAlign: "center", fontSize: "13px", color: "#64748b" }}>AQUI O CONTACTO</span>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "pedir" && (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {solicitacaoSucesso && (
            <div
              style={{
                backgroundColor: "#dcfce7",
                color: "#166534",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              ✅ Solicitação enviada com sucesso! Redirecionando...
            </div>
          )}
          <SolicitarManutencao
            onSuccess={handleSuccessCadastro}
            onCancelar={() => setActiveTab("lista")}
          />
        </div>
      )}
    </div>
  );
}
