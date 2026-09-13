import React, { useState, useMemo, useEffect } from "react";
import CadastroManutencao from "../../components/drones/formularios/CadastroManutencao";

export default function Manutencao({
  openFormOnMount = false,
  onFormOpened,
}) {
  // "lista" = solicitudes | "pedir" = formulario de cadastro
  const [activeTab, setActiveTab] = useState("lista");
  const [solicitacaoSucesso, setSolicitacaoSucesso] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [urgenciaFiltro, setUrgenciaFiltro] = useState("");

  const [solicitacoes, setSolicitacoes] = useState([
    {
      id: 1,
      titulo: "Revisão Preventiva Dji Mavic 3",
      cliente: "Carlos Silva",
      categoria: "Preventiva",
      equipamento: "DJI Mavic 3 Enterprise",
      estado: "SP",
      cidade: "São Paulo",
      urgencia: "Media",
      descricao: "Necessito de verificação geral dos motores e calibração de sensores IMU.",
      data: "2026-03-28",
      contatoWhatsApp: "11999999999",
      orcamentosRecebidos: 2
    },
    {
      id: 2,
      titulo: "Troca de Braço Frontal Matrice 300",
      cliente: "AgroFly Soluções",
      categoria: "Corretiva",
      equipamento: "DJI Matrice 300 RTK",
      estado: "PR",
      cidade: "Cascavel",
      urgencia: "Alta",
      descricao: "Queda leve danificou o brazo frontal esquerdo. Pouso forçado.",
      data: "2026-03-29",
      contatoWhatsApp: "45988888888",
      orcamentosRecebidos: 5
    }
  ]);

  // Si llegamos desde CADASTRO, abrir la pestaña del formulario
  useEffect(() => {
    if (openFormOnMount) {
      setActiveTab("pedir");
      if (onFormOpened) onFormOpened();
    }
  }, [openFormOnMount, onFormOpened]);

  const handleSuccessCadastro = (novoRegistro) => {
    const registroFormatado = {
      ...novoRegistro,
      id: Date.now(),
      data: new Date().toISOString().split("T")[0],
      orcamentosRecebidos: 0
    };
    setSolicitacoes([registroFormatado, ...solicitacoes]);
    setSolicitacaoSucesso(true);
    setTimeout(() => {
      setSolicitacaoSucesso(false);
      setActiveTab("lista");
    }, 2000);
  };

  const solicitacoesFiltradas = useMemo(() => {
    return solicitacoes.filter((item) => {
      const matchSearch =
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase());

      const matchEstado = selectedEstado ? item.estado === selectedEstado : true;
      const matchCategoria = selectedCategoria ? item.categoria === selectedCategoria : true;
      const matchUrgencia = urgenciaFiltro ? item.urgencia === urgenciaFiltro : true;

      return matchSearch && matchEstado && matchCategoria && matchUrgencia;
    });
  }, [solicitacoes, searchTerm, selectedEstado, selectedCategoria, urgenciaFiltro]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
          Manutenção de Drones
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Conecte seu equipamento com assistências técnicas e mecânicos especializados.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
        <button
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

      {activeTab === "lista" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginBottom: "25px",
              backgroundColor: "var(--bg-card)",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)"
            }}
          >
            <input
              type="text"
              placeholder="Buscar por equipo o falla..."
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
              style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
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
              style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            >
              <option value="">Todas as Categorias</option>
              <option value="Preventiva">Preventiva</option>
              <option value="Corretiva">Corretiva</option>
              <option value="Calibração">Calibração</option>
            </select>

            <select
              value={urgenciaFiltro}
              onChange={(e) => setUrgenciaFiltro(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            >
              <option value="">Qualquer Urgência</option>
              <option value="Alta">Alta</option>
              <option value="Media">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
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
              {solicitacoesFiltradas.map((item) => (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
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
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                      📍 {item.cidade} - {item.estado}
                    </p>
                    <p style={{ fontSize: "0.95rem", fontWeight: "500", marginBottom: "12px" }}>
                      🛸 {item.equipamento}
                    </p>

                    <p style={{ fontSize: "0.9rem", lineHeight: "1.4", marginBottom: "15px" }}>
                      {item.descricao}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "10px" }}>
                    <a
                      href={`https://wa.me/55${item.contatoWhatsApp.replace(/\D/g, "")}`}
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
                  </div>
                </div>
              ))}
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
          <CadastroManutencao onSuccess={handleSuccessCadastro} />
        </div>
      )}
    </div>
  );
}