import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Save, Trash2 } from "lucide-react";
import { toApiErrorMessage, useAuth } from "@/features/auth";
import {
  useCreateGameQuestion,
  useDeleteGameQuestion,
  useGameQuestions,
  useGames,
  useUpdateGameQuestion,
  type Game,
  type GameQuestion,
  type GameQuestionsFilters,
} from "@/features/games";
import {
  useEducationLevels,
  useEducationStages,
  useEducationSubjects,
  type EducationStage,
  type EducationSubject,
} from "@/features/education";
import {
  useAddExamQuestions,
  useCreateDifficultyLevel,
  useCreateExam,
  useDeleteDifficultyLevel,
  useDeleteExam,
  useDifficultyLevels,
  useExamDetail,
  useExams,
  useRemoveExamQuestion,
  useUpdateDifficultyLevel,
  useUpdateExam,
  type DifficultyLevel,
  type DifficultyLevelFilters,
  type Exam,
  type ExamFilters,
  type ExamQuestionRef,
} from "@/features/exams";
import { useNavigate, useParams } from "react-router-dom";

type Tab = "questions" | "exams" | "difficulty-levels";

function gameTitle(game: Game) {
  return (game.name ?? game.title ?? `Game #${game.id}`).toString();
}

function questionText(question: GameQuestion) {
  return (
    question.text ??
    question.question_text ??
    `Question #${question.id}`
  ).toString();
}

function questionGameId(question: GameQuestion): number | null {
  if (typeof question.game_id === "number") {
    return question.game_id;
  }

  if (typeof question.game === "number") {
    return question.game;
  }

  if (
    question.game &&
    typeof question.game === "object" &&
    typeof question.game.id === "number"
  ) {
    return question.game.id;
  }

  return null;
}

function examTitle(exam: Exam) {
  return (exam.title ?? exam.name ?? `Exam #${exam.id}`).toString();
}

function difficultyLabel(level: DifficultyLevel) {
  return (
    level.level ??
    level.name ??
    level.label ??
    `Level #${level.id}`
  ).toString();
}

function examQuestionEqId(ref: ExamQuestionRef): number | null {
  if (typeof ref.exam_question_id === "number") {
    return ref.exam_question_id;
  }

  if (typeof ref.eq_id === "number") {
    return ref.eq_id;
  }

  if (typeof ref.id === "number") {
    return ref.id;
  }

  return null;
}

function examQuestionText(ref: ExamQuestionRef) {
  return (ref.question_text ?? ref.text ?? `Question Ref`).toString();
}

function getExamSubjectId(exam: Exam): number | string | null {
  if (typeof exam.subject_id === "number") {
    return exam.subject_id;
  }

  return exam.subject ?? null;
}

function getExamStageId(exam: Exam): number | string | null {
  if (typeof exam.stage_id === "number") {
    return exam.stage_id;
  }

  return exam.stage ?? null;
}

function getExamDifficultyLevelId(exam: Exam): number | string | null {
  if (typeof exam.difficulty_level_id === "number") {
    return exam.difficulty_level_id;
  }

  return exam.difficulty_level ?? null;
}

function getDifficultySubjectId(level: DifficultyLevel): number | null {
  if (typeof level.subject_id === "number") {
    return level.subject_id;
  }

  if (typeof level.subject === "number") {
    return level.subject;
  }

  return null;
}

export default function GameQuestionsManager() {
  const { role } = useAuth();
  const canManage = role === "school_admin";
  const { tab: tabParam } = useParams<{ tab: string }>();
  const navigate = useNavigate();

  const tab = useMemo<Tab>(() => {
    if (tabParam === "exams" || tabParam === "difficulty-levels") {
      return tabParam;
    }
    return "questions";
  }, [tabParam]);

  const setTab = (nextTab: Tab) => {
    navigate(`../${nextTab}`, { replace: true });
  };

  const [questionTextValue, setQuestionTextValue] = useState("");
  const [questionDifficultyId, setQuestionDifficultyId] = useState("");
  const [questionType, setQuestionType] = useState("mcq");
  const [questionGameIdValue, setQuestionGameIdValue] = useState("");
  const [questionEducationLevelId, setQuestionEducationLevelId] = useState("");
  const [questionStageId, setQuestionStageId] = useState("");
  const [questionSubjectId, setQuestionSubjectId] = useState("");
  const [questionPoints, setQuestionPoints] = useState("1");
  const [questionIsActive, setQuestionIsActive] = useState(true);
  const [fillBlankAnswer, setFillBlankAnswer] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null,
  );
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [choiceTexts, setChoiceTexts] = useState(["", "", "", ""]);
  const [correctChoiceIndex, setCorrectChoiceIndex] = useState(0);

  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterGame, setFilterGame] = useState("all");
  const [filterActive, setFilterActive] = useState("all");

  const [examTitleValue, setExamTitleValue] = useState("");
  const [examEducationLevelId, setExamEducationLevelId] = useState("");
  const [examSubjectId, setExamSubjectId] = useState("");
  const [examStageId, setExamStageId] = useState("");
  const [examDifficultyId, setExamDifficultyId] = useState("");
  const [examEducationYear, setExamEducationYear] = useState("");
  const [examDurationMinutes, setExamDurationMinutes] = useState("45");
  const [examIsActive, setExamIsActive] = useState(true);
  const [editingExamId, setEditingExamId] = useState<number | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  const [examFilterEducationLevelId, setExamFilterEducationLevelId] =
    useState("all");
  const [examFilterSubject, setExamFilterSubject] = useState("all");
  const [examFilterStage, setExamFilterStage] = useState("all");
  const [examFilterDifficulty, setExamFilterDifficulty] = useState("all");
  const [examFilterYear, setExamFilterYear] = useState("all");
  const [examFilterActive, setExamFilterActive] = useState("all");

  const [selectedExamIdForDetail, setSelectedExamIdForDetail] = useState<
    number | null
  >(null);
  const [bulkQuestionIds, setBulkQuestionIds] = useState("");
  const [isQuestionPickerOpen, setIsQuestionPickerOpen] = useState(false);
  const [pickerEduLevelId, setPickerEduLevelId] = useState("");
  const [pickerStageId, setPickerStageId] = useState("");
  const [pickerSubjectId, setPickerSubjectId] = useState("");
  const [pickerGameId, setPickerGameId] = useState("all");
  const [pickerDifficultyId, setPickerDifficultyId] = useState("all");
  const [pickerSelectedIds, setPickerSelectedIds] = useState<Set<number>>(
    new Set(),
  );

  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [difficultyDescription, setDifficultyDescription] = useState("");
  const [difficultyEducationLevelId, setDifficultyEducationLevelId] =
    useState("");
  const [difficultyStageId, setDifficultyStageId] = useState("");
  const [difficultySubjectId, setDifficultySubjectId] = useState("");
  const [editingDifficultyId, setEditingDifficultyId] = useState<number | null>(
    null,
  );
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [
    difficultyFilterEducationLevelId,
    setDifficultyFilterEducationLevelId,
  ] = useState("all");
  const [difficultyFilterStageId, setDifficultyFilterStageId] = useState("all");
  const [difficultyFilterSubject, setDifficultyFilterSubject] = useState("all");

  const gamesQuery = useGames();
  const educationLevelsQuery = useEducationLevels();
  const educationStagesQuery = useEducationStages();
  const educationSubjectsQuery = useEducationSubjects();
  const difficultyModalStagesQuery = useEducationStages(
    difficultyEducationLevelId
      ? { education_level: Number(difficultyEducationLevelId) }
      : undefined,
    Boolean(difficultyEducationLevelId),
  );
  const difficultyModalSubjectsQuery = useEducationSubjects(
    difficultyStageId ? { stage: Number(difficultyStageId) } : undefined,
    Boolean(difficultyStageId),
  );
  const questionModalStagesQuery = useEducationStages(
    questionEducationLevelId
      ? { education_level: Number(questionEducationLevelId) }
      : undefined,
    Boolean(questionEducationLevelId),
  );
  const questionModalSubjectsQuery = useEducationSubjects(
    questionStageId ? { stage: Number(questionStageId) } : undefined,
    Boolean(questionStageId),
  );
  const questionModalDifficultyQuery = useDifficultyLevels(
    questionSubjectId ? { subject: Number(questionSubjectId) } : undefined,
    Boolean(questionSubjectId),
  );
  const examModalStagesQuery = useEducationStages(
    examEducationLevelId
      ? { education_level: Number(examEducationLevelId) }
      : undefined,
    Boolean(examEducationLevelId),
  );
  const examModalSubjectsQuery = useEducationSubjects(
    examStageId ? { stage: Number(examStageId) } : undefined,
    Boolean(examStageId),
  );
  const examFilterStagesQuery = useEducationStages(
    examFilterEducationLevelId !== "all"
      ? { education_level: Number(examFilterEducationLevelId) }
      : undefined,
    examFilterEducationLevelId !== "all",
  );
  const examFilterSubjectsQuery = useEducationSubjects(
    examFilterStage !== "all" ? { stage: Number(examFilterStage) } : undefined,
    examFilterStage !== "all",
  );
  const difficultyFilterStagesQuery = useEducationStages(
    difficultyFilterEducationLevelId !== "all"
      ? { education_level: Number(difficultyFilterEducationLevelId) }
      : undefined,
    difficultyFilterEducationLevelId !== "all",
  );
  const difficultyFilterSubjectsQuery = useEducationSubjects(
    difficultyFilterStageId !== "all"
      ? { stage: Number(difficultyFilterStageId) }
      : undefined,
    difficultyFilterStageId !== "all",
  );
  const pickerStagesQuery = useEducationStages(
    pickerEduLevelId
      ? { education_level: Number(pickerEduLevelId) }
      : undefined,
    Boolean(pickerEduLevelId),
  );
  const pickerSubjectsQuery = useEducationSubjects(
    pickerStageId ? { stage: Number(pickerStageId) } : undefined,
    Boolean(pickerStageId),
  );

  const questionFilters = useMemo<GameQuestionsFilters>(() => {
    return {
      game: filterGame === "all" ? undefined : Number(filterGame),
      difficulty_level:
        filterDifficulty === "all" ? undefined : Number(filterDifficulty),
      question_type: filterType === "all" ? undefined : filterType,
      is_active: filterActive === "all" ? undefined : filterActive === "true",
    };
  }, [filterDifficulty, filterGame, filterType, filterActive]);

  const examFilters = useMemo<ExamFilters>(() => {
    return {
      subject:
        examFilterSubject === "all" ? undefined : Number(examFilterSubject),
      stage: examFilterStage === "all" ? undefined : Number(examFilterStage),
      difficulty_level:
        examFilterDifficulty === "all"
          ? undefined
          : Number(examFilterDifficulty),
      education_year: examFilterYear === "all" ? undefined : examFilterYear,
      is_active:
        examFilterActive === "all" ? undefined : examFilterActive === "true",
    };
  }, [
    examFilterActive,
    examFilterDifficulty,
    examFilterStage,
    examFilterSubject,
    examFilterYear,
  ]);

  const difficultyFilters = useMemo<DifficultyLevelFilters>(() => {
    return {
      subject:
        difficultyFilterSubject === "all"
          ? undefined
          : Number(difficultyFilterSubject),
    };
  }, [difficultyFilterSubject]);

  const pickerQuestionFilters = useMemo<GameQuestionsFilters>(
    () => ({
      subject: pickerSubjectId ? Number(pickerSubjectId) : undefined,
      game: pickerGameId !== "all" ? Number(pickerGameId) : undefined,
      difficulty_level:
        pickerDifficultyId !== "all" ? Number(pickerDifficultyId) : undefined,
    }),
    [pickerSubjectId, pickerGameId, pickerDifficultyId],
  );

  const questionsQuery = useGameQuestions(questionFilters);
  const pickerQuestionsQuery = useGameQuestions(
    pickerQuestionFilters,
    isQuestionPickerOpen,
  );
  const examsQuery = useExams(examFilters);
  const examDetailQuery = useExamDetail(selectedExamIdForDetail, true);
  const allDifficultyLevelsQuery = useDifficultyLevels(undefined);
  const difficultyLevelsQuery = useDifficultyLevels(difficultyFilters);

  const createQuestionMutation = useCreateGameQuestion();
  const updateQuestionMutation = useUpdateGameQuestion();
  const deleteQuestionMutation = useDeleteGameQuestion();

  const createExamMutation = useCreateExam();
  const updateExamMutation = useUpdateExam();
  const deleteExamMutation = useDeleteExam();
  const addExamQuestionsMutation = useAddExamQuestions();
  const removeExamQuestionMutation = useRemoveExamQuestion();

  const createDifficultyMutation = useCreateDifficultyLevel();
  const updateDifficultyMutation = useUpdateDifficultyLevel();
  const deleteDifficultyMutation = useDeleteDifficultyLevel();

  const gamesById = useMemo(() => {
    const map = new Map<number, Game>();
    (gamesQuery.data ?? []).forEach((game) => map.set(game.id, game));
    return map;
  }, [gamesQuery.data]);

  const educationStagesById = useMemo(() => {
    const map = new Map<number, EducationStage>();
    (educationStagesQuery.data ?? []).forEach((stage) =>
      map.set(stage.id, stage),
    );
    return map;
  }, [educationStagesQuery.data]);

  const educationLevelsById = useMemo(() => {
    const map = new Map<number, string>();
    (educationLevelsQuery.data ?? []).forEach((level) =>
      map.set(level.id, level.name),
    );
    return map;
  }, [educationLevelsQuery.data]);

  const subjectOptions = useMemo(() => {
    return (educationSubjectsQuery.data ?? []).map((subject) => {
      const stage = educationStagesById.get(subject.stage_id);
      const levelName = stage
        ? educationLevelsById.get(stage.education_level_id)
        : undefined;

      const details = [levelName, stage?.name].filter(Boolean).join(" - ");

      return {
        id: subject.id,
        label: details ? `${subject.name} (${details})` : subject.name,
      };
    });
  }, [educationLevelsById, educationStagesById, educationSubjectsQuery.data]);

  const subjectLabelById = useMemo(() => {
    const map = new Map<number, string>();
    subjectOptions.forEach((subject) => {
      map.set(subject.id, subject.label);
    });
    return map;
  }, [subjectOptions]);

  const difficultyLevelById = useMemo(() => {
    const map = new Map<number, DifficultyLevel>();
    (allDifficultyLevelsQuery.data ?? []).forEach((level) =>
      map.set(level.id, level),
    );
    return map;
  }, [allDifficultyLevelsQuery.data]);

  const stageOptions = useMemo(() => {
    return (educationStagesQuery.data ?? []).map((stage) => {
      const levelName = educationLevelsById.get(stage.education_level_id);
      return {
        id: stage.id,
        label: levelName ? `${stage.name} (${levelName})` : stage.name,
      };
    });
  }, [educationLevelsById, educationStagesQuery.data]);

  const difficultyModalStageOptions = useMemo(() => {
    return (difficultyModalStagesQuery.data ?? []).map((stage) => ({
      id: stage.id,
      label: stage.name,
    }));
  }, [difficultyModalStagesQuery.data]);

  const difficultyModalSubjectOptions = useMemo(() => {
    return (difficultyModalSubjectsQuery.data ?? []).map((subject) => ({
      id: subject.id,
      label: subject.name,
    }));
  }, [difficultyModalSubjectsQuery.data]);

  const examModalStageOptions = useMemo(() => {
    return (examModalStagesQuery.data ?? []).map((stage) => ({
      id: stage.id,
      label: stage.name,
    }));
  }, [examModalStagesQuery.data]);

  const examModalSubjectOptions = useMemo(() => {
    return (examModalSubjectsQuery.data ?? []).map((subject) => ({
      id: subject.id,
      label: subject.name,
    }));
  }, [examModalSubjectsQuery.data]);

  const questionModalStageOptions = useMemo(() => {
    return (questionModalStagesQuery.data ?? []).map((stage) => ({
      id: stage.id,
      label: stage.name,
    }));
  }, [questionModalStagesQuery.data]);

  const questionModalSubjectOptions = useMemo(() => {
    return (questionModalSubjectsQuery.data ?? []).map((subject) => ({
      id: subject.id,
      label: subject.name,
    }));
  }, [questionModalSubjectsQuery.data]);

  const examFilterStageOptions = useMemo(() => {
    return (examFilterStagesQuery.data ?? []).map((stage) => ({
      id: stage.id,
      label: stage.name,
    }));
  }, [examFilterStagesQuery.data]);

  const examFilterSubjectOptions = useMemo(() => {
    return (examFilterSubjectsQuery.data ?? []).map((subject) => ({
      id: subject.id,
      label: subject.name,
    }));
  }, [examFilterSubjectsQuery.data]);

  const difficultyFilterStageOptions = useMemo(() => {
    return (difficultyFilterStagesQuery.data ?? []).map((stage) => ({
      id: stage.id,
      label: stage.name,
    }));
  }, [difficultyFilterStagesQuery.data]);

  const difficultyFilterSubjectOptions = useMemo(() => {
    return (difficultyFilterSubjectsQuery.data ?? []).map((subject) => ({
      id: subject.id,
      label: subject.name,
    }));
  }, [difficultyFilterSubjectsQuery.data]);

  const pickerStageOptions = useMemo(() => {
    return (pickerStagesQuery.data ?? []).map((stage) => ({
      id: stage.id,
      label: stage.name,
    }));
  }, [pickerStagesQuery.data]);

  const pickerSubjectOptions = useMemo(() => {
    return (pickerSubjectsQuery.data ?? []).map((subject) => ({
      id: subject.id,
      label: subject.name,
    }));
  }, [pickerSubjectsQuery.data]);

  const examDifficultyOptions = useMemo(() => {
    const allLevels = allDifficultyLevelsQuery.data ?? [];

    if (!examSubjectId) {
      return allLevels;
    }

    const selectedSubjectId = Number(examSubjectId);
    if (!Number.isFinite(selectedSubjectId) || selectedSubjectId <= 0) {
      return allLevels;
    }

    const filtered = allLevels.filter((level) => {
      const levelSubjectId = getDifficultySubjectId(level);
      return levelSubjectId === selectedSubjectId;
    });

    return filtered.length > 0 ? filtered : allLevels;
  }, [allDifficultyLevelsQuery.data, examSubjectId]);

  const error =
    gamesQuery.error ??
    educationLevelsQuery.error ??
    educationStagesQuery.error ??
    educationSubjectsQuery.error ??
    questionModalStagesQuery.error ??
    questionModalSubjectsQuery.error ??
    questionModalDifficultyQuery.error ??
    difficultyModalStagesQuery.error ??
    difficultyModalSubjectsQuery.error ??
    examModalStagesQuery.error ??
    examModalSubjectsQuery.error ??
    examFilterStagesQuery.error ??
    examFilterSubjectsQuery.error ??
    difficultyFilterStagesQuery.error ??
    difficultyFilterSubjectsQuery.error ??
    pickerStagesQuery.error ??
    pickerSubjectsQuery.error ??
    questionsQuery.error ??
    examsQuery.error ??
    examDetailQuery.error ??
    allDifficultyLevelsQuery.error ??
    difficultyLevelsQuery.error ??
    createQuestionMutation.error ??
    updateQuestionMutation.error ??
    deleteQuestionMutation.error ??
    createExamMutation.error ??
    updateExamMutation.error ??
    deleteExamMutation.error ??
    addExamQuestionsMutation.error ??
    removeExamQuestionMutation.error ??
    createDifficultyMutation.error ??
    updateDifficultyMutation.error ??
    deleteDifficultyMutation.error;

  const resetQuestionForm = () => {
    setQuestionTextValue("");
    setQuestionDifficultyId("");
    setQuestionType("mcq");
    setQuestionGameIdValue("");
    setQuestionEducationLevelId("");
    setQuestionStageId("");
    setQuestionSubjectId("");
    setQuestionPoints("1");
    setQuestionIsActive(true);
    setFillBlankAnswer("");
    setEditingQuestionId(null);
    setChoiceTexts(["", "", "", ""]);
    setCorrectChoiceIndex(0);
  };

  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value);

    if (value === "true_false") {
      setChoiceTexts(["صح", "خطأ", "", ""]);
      if (correctChoiceIndex > 1) {
        setCorrectChoiceIndex(0);
      }
      return;
    }

    if (value === "fill_blank") {
      setChoiceTexts(["", "", "", ""]);
      setCorrectChoiceIndex(0);
    }
  };

  const handleQuestionModalOpenChange = (open: boolean) => {
    setIsQuestionModalOpen(open);

    if (!open) {
      resetQuestionForm();
    }
  };

  const openCreateQuestionModal = () => {
    resetQuestionForm();
    setIsQuestionModalOpen(true);
  };

  const handleExamModalOpenChange = (open: boolean) => {
    setIsExamModalOpen(open);

    if (!open) {
      resetExamForm();
    }
  };

  const openCreateExamModal = () => {
    resetExamForm();
    setIsExamModalOpen(true);
  };

  const handleDifficultyModalOpenChange = (open: boolean) => {
    setIsDifficultyModalOpen(open);

    if (!open) {
      resetDifficultyForm();
    }
  };

  const openCreateDifficultyModal = () => {
    resetDifficultyForm();
    setIsDifficultyModalOpen(true);
  };

  const resetExamForm = () => {
    setExamTitleValue("");
    setExamEducationLevelId("");
    setExamSubjectId("");
    setExamStageId("");
    setExamDifficultyId("");
    setExamEducationYear("");
    setExamDurationMinutes("45");
    setExamIsActive(true);
    setEditingExamId(null);
  };

  const resetDifficultyForm = () => {
    setDifficultyLevel("easy");
    setDifficultyDescription("");
    setDifficultyEducationLevelId("");
    setDifficultyStageId("");
    setDifficultySubjectId("");
    setEditingDifficultyId(null);
  };

  const handleQuestionEducationLevelChange = (value: string) => {
    const nextLevelId = value === "none" ? "" : value;
    setQuestionEducationLevelId(nextLevelId);
    setQuestionStageId("");
    setQuestionSubjectId("");
    setQuestionDifficultyId("");
  };

  const handleQuestionModalStageChange = (value: string) => {
    const nextStageId = value === "none" ? "" : value;
    setQuestionStageId(nextStageId);
    setQuestionSubjectId("");
    setQuestionDifficultyId("");
  };

  const handleExamEducationLevelChange = (value: string) => {
    const nextLevelId = value === "none" ? "" : value;
    setExamEducationLevelId(nextLevelId);
    setExamStageId("");
    setExamSubjectId("");
    setExamDifficultyId("");
  };

  const handleExamModalStageChange = (value: string) => {
    const nextStageId = value === "none" ? "" : value;
    setExamStageId(nextStageId);
    setExamSubjectId("");
    setExamDifficultyId("");
  };

  const handleExamFilterEducationLevelChange = (value: string) => {
    setExamFilterEducationLevelId(value);
    setExamFilterStage("all");
    setExamFilterSubject("all");
  };

  const handleExamFilterStageChange = (value: string) => {
    setExamFilterStage(value);
    setExamFilterSubject("all");
  };

  const handleDifficultyFilterEducationLevelChange = (value: string) => {
    setDifficultyFilterEducationLevelId(value);
    setDifficultyFilterStageId("all");
    setDifficultyFilterSubject("all");
  };

  const handleDifficultyFilterStageChange = (value: string) => {
    setDifficultyFilterStageId(value);
    setDifficultyFilterSubject("all");
  };

  const handleDifficultyEducationLevelChange = (value: string) => {
    const nextLevelId = value === "none" ? "" : value;
    setDifficultyEducationLevelId(nextLevelId);
    setDifficultyStageId("");
    setDifficultySubjectId("");
  };

  const handleDifficultyStageChange = (value: string) => {
    const nextStageId = value === "none" ? "" : value;
    setDifficultyStageId(nextStageId);
    setDifficultySubjectId("");
  };

  const saveQuestion = async (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedChoices = choiceTexts
      .map((text, index) => ({
        text: text.trim(),
        is_correct: index === correctChoiceIndex,
      }))
      .filter((choice) => choice.text.length > 0);

    const choices =
      questionType === "fill_blank"
        ? undefined
        : questionType === "true_false"
          ? normalizedChoices.slice(0, 2)
          : normalizedChoices;

    const payload = {
      text: questionTextValue.trim(),
      question_type: questionType,
      points: Number(questionPoints) || 1,
      game_id: Number(questionGameIdValue),
      subject_id: questionSubjectId ? Number(questionSubjectId) : undefined,
      difficulty_level_id: Number(questionDifficultyId),
      is_active: questionIsActive,
      ...(choices ? { choices } : {}),
    };

    if (editingQuestionId) {
      await updateQuestionMutation.mutateAsync({
        id: editingQuestionId,
        payload,
      });
    } else {
      await createQuestionMutation.mutateAsync(payload);
    }

    setIsQuestionModalOpen(false);
    resetQuestionForm();
  };

  const saveExam = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      title: examTitleValue.trim(),
      subject_id: examSubjectId ? Number(examSubjectId) : undefined,
      stage_id: examStageId ? Number(examStageId) : undefined,
      difficulty_level_id: examDifficultyId
        ? Number(examDifficultyId)
        : undefined,
      education_year: examEducationYear || undefined,
      duration_minutes: Number(examDurationMinutes) || undefined,
      is_active: examIsActive,
    };

    if (editingExamId) {
      await updateExamMutation.mutateAsync({ id: editingExamId, payload });
    } else {
      await createExamMutation.mutateAsync(payload);
    }

    setIsExamModalOpen(false);
    resetExamForm();
  };

  const saveDifficulty = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      level: difficultyLevel,
      description: difficultyDescription.trim() || undefined,
      subject_id: difficultySubjectId ? Number(difficultySubjectId) : undefined,
    };

    if (editingDifficultyId) {
      await updateDifficultyMutation.mutateAsync({
        id: editingDifficultyId,
        payload,
      });
    } else {
      await createDifficultyMutation.mutateAsync(payload);
    }

    setIsDifficultyModalOpen(false);
    resetDifficultyForm();
  };

  const addQuestionsToExam = async () => {
    if (!selectedExamIdForDetail) {
      return;
    }

    const questionIds = bulkQuestionIds
      .split(",")
      .map((part) => Number(part.trim()))
      .filter((id) => Number.isFinite(id) && id > 0);

    if (questionIds.length === 0) {
      return;
    }

    const nextOrderBase =
      Math.max(
        0,
        ...examDetailQuestions
          .map((q) => (typeof q.order === "number" ? q.order : 0))
          .filter((order) => Number.isFinite(order)),
      ) + 1;

    await addExamQuestionsMutation.mutateAsync({
      id: selectedExamIdForDetail,
      payload: {
        questions: questionIds.map((question_id, index) => ({
          question_id,
          order: nextOrderBase + index,
        })),
      },
    });

    setBulkQuestionIds("");
  };

  const addSelectedQuestionsToExam = async () => {
    if (!selectedExamIdForDetail || pickerSelectedIds.size === 0) {
      return;
    }

    const questionIds = Array.from(pickerSelectedIds);
    const nextOrderBase =
      Math.max(
        0,
        ...examDetailQuestions
          .map((q) => (typeof q.order === "number" ? q.order : 0))
          .filter((order) => Number.isFinite(order)),
      ) + 1;

    await addExamQuestionsMutation.mutateAsync({
      id: selectedExamIdForDetail,
      payload: {
        questions: questionIds.map((question_id, index) => ({
          question_id,
          order: nextOrderBase + index,
        })),
      },
    });

    setPickerSelectedIds(new Set());
    setIsQuestionPickerOpen(false);
  };

  const startEditQuestion = (question: GameQuestion) => {
    setEditingQuestionId(question.id);
    setQuestionTextValue(questionText(question));
    const difficultyId =
      typeof question.difficulty_level_id === "number"
        ? question.difficulty_level_id
        : typeof question.difficulty_level === "number"
          ? question.difficulty_level
          : null;
    setQuestionDifficultyId(difficultyId ? String(difficultyId) : "");
    setQuestionType((question.question_type ?? "mcq").toString());
    const qGameId = questionGameId(question);
    setQuestionGameIdValue(qGameId ? String(qGameId) : "");
    const subject =
      typeof question.subject_id === "number"
        ? question.subject_id
        : question.subject;
    const numericSubjectId =
      typeof subject === "number" ? subject : subject ? Number(subject) : null;
    const currentSubjectQ =
      numericSubjectId !== null && Number.isFinite(numericSubjectId)
        ? (educationSubjectsQuery.data ?? []).find(
            (s) => s.id === numericSubjectId,
          )
        : undefined;
    const currentStageQ = currentSubjectQ
      ? educationStagesById.get(currentSubjectQ.stage_id)
      : undefined;
    setQuestionEducationLevelId(
      currentStageQ ? String(currentStageQ.education_level_id) : "",
    );
    setQuestionStageId(currentSubjectQ ? String(currentSubjectQ.stage_id) : "");
    setQuestionSubjectId(
      typeof subject === "number" || typeof subject === "string"
        ? String(subject)
        : "",
    );
    setQuestionPoints(
      typeof question.points === "number" && Number.isFinite(question.points)
        ? String(question.points)
        : "1",
    );
    setQuestionIsActive(
      typeof question.is_active === "boolean" ? question.is_active : true,
    );

    const existingChoices = question.choices ?? [];
    const nextChoices = ["", "", "", ""];
    let nextCorrectIndex = 0;
    let nextFillBlankAnswer = "";

    existingChoices.slice(0, 4).forEach((choice, index) => {
      nextChoices[index] = choice.text;
      if (choice.is_correct) {
        nextCorrectIndex = index;
        if (!nextFillBlankAnswer) {
          nextFillBlankAnswer = choice.text;
        }
      }
    });

    setChoiceTexts(nextChoices);
    setCorrectChoiceIndex(nextCorrectIndex);
    setFillBlankAnswer(nextFillBlankAnswer);
    setIsQuestionModalOpen(true);
    setTab("questions");
  };

  const startEditExam = (exam: Exam) => {
    setEditingExamId(exam.id);
    setExamTitleValue(examTitle(exam));
    const subjectId = getExamSubjectId(exam);
    setExamSubjectId(
      typeof subjectId === "number" || typeof subjectId === "string"
        ? String(subjectId)
        : "",
    );
    const stageId = getExamStageId(exam);
    const numericStageId =
      typeof stageId === "number" ? stageId : stageId ? Number(stageId) : null;
    setExamStageId(
      typeof stageId === "number" || typeof stageId === "string"
        ? String(stageId)
        : "",
    );
    const currentStage =
      numericStageId !== null && Number.isFinite(numericStageId)
        ? educationStagesById.get(numericStageId)
        : undefined;
    setExamEducationLevelId(
      currentStage ? String(currentStage.education_level_id) : "",
    );
    const difficultyId = getExamDifficultyLevelId(exam);
    setExamDifficultyId(
      typeof difficultyId === "number" || typeof difficultyId === "string"
        ? String(difficultyId)
        : "",
    );
    setExamEducationYear(exam.education_year ?? "");
    setExamDurationMinutes(
      typeof exam.duration_minutes === "number"
        ? String(exam.duration_minutes)
        : "45",
    );
    setExamIsActive(
      typeof exam.is_active === "boolean" ? exam.is_active : true,
    );
    setSelectedExamIdForDetail(exam.id);
    setIsExamModalOpen(true);
    setTab("exams");
  };

  const startEditDifficulty = (level: DifficultyLevel) => {
    setEditingDifficultyId(level.id);
    setDifficultyLevel((level.level ?? "easy").toString());
    setDifficultyDescription((level.description ?? "").toString());
    const subjectId =
      typeof level.subject_id === "number" ? level.subject_id : level.subject;
    const currentSubject = (educationSubjectsQuery.data ?? []).find(
      (subject) => subject.id === subjectId,
    );
    const currentStage = currentSubject
      ? educationStagesById.get(currentSubject.stage_id)
      : undefined;

    setDifficultyEducationLevelId(
      currentStage ? String(currentStage.education_level_id) : "",
    );
    setDifficultyStageId(currentSubject ? String(currentSubject.stage_id) : "");
    setDifficultySubjectId(
      typeof subjectId === "number" || typeof subjectId === "string"
        ? String(subjectId)
        : "",
    );
    setIsDifficultyModalOpen(true);
    setTab("difficulty-levels");
  };

  const examDetailQuestions = examDetailQuery.data?.questions ?? [];

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            الأسئلة والاختبارات
          </h1>
          {/* <p className="text-sm text-gray-600 mt-1">
            GET لكل المستخدمين. الإضافة/التعديل/الحذف متاحة فقط لـ school_admin.
          </p> */}
        </div>

        {canManage && (
          <Button
            type="button"
            className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
            onClick={() => {
              if (tab === "questions") {
                openCreateQuestionModal();
                return;
              }

              if (tab === "exams") {
                openCreateExamModal();
                return;
              }

              openCreateDifficultyModal();
            }}
          >
            <Plus className="w-4 h-4" />
            {tab === "questions"
              ? "إضافة سؤال"
              : tab === "exams"
                ? "إضافة اختبار"
                : "إضافة مستوى صعوبة"}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={tab === "questions" ? "default" : "outline"}
          className={
            tab === "questions" ? "bg-[#8B5CF6] hover:bg-[#7C3AED]" : ""
          }
          onClick={() => setTab("questions")}
        >
          أسئلة الألعاب
        </Button>
        <Button
          variant={tab === "exams" ? "default" : "outline"}
          className={tab === "exams" ? "bg-[#8B5CF6] hover:bg-[#7C3AED]" : ""}
          onClick={() => setTab("exams")}
        >
          الاختبارات
        </Button>
        <Button
          variant={tab === "difficulty-levels" ? "default" : "outline"}
          className={
            tab === "difficulty-levels" ? "bg-[#8B5CF6] hover:bg-[#7C3AED]" : ""
          }
          onClick={() => setTab("difficulty-levels")}
        >
          مستويات الصعوبة
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {toApiErrorMessage(error)}
        </div>
      )}

      {tab === "questions" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm grid gap-3 md:grid-cols-4">
            <Select value={filterGame} onValueChange={setFilterGame}>
              <SelectTrigger>
                <SelectValue placeholder="اللعبة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الألعاب</SelectItem>
                {(gamesQuery.data ?? []).map((game) => (
                  <SelectItem key={game.id} value={String(game.id)}>
                    {gameTitle(game)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filterDifficulty}
              onValueChange={setFilterDifficulty}
            >
              <SelectTrigger>
                <SelectValue placeholder="الصعوبة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المستويات</SelectItem>
                {(allDifficultyLevelsQuery.data ?? []).map((level) => (
                  <SelectItem key={level.id} value={String(level.id)}>
                    {difficultyLabel(level)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="نوع السؤال" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأنواع</SelectItem>
                <SelectItem value="mcq">mcq</SelectItem>
                <SelectItem value="true_false">true_false</SelectItem>
                <SelectItem value="fill_blank">fill_blank</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterActive} onValueChange={setFilterActive}>
              <SelectTrigger>
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="true">مفعلة</SelectItem>
                <SelectItem value="false">غير مفعلة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {canManage && (
            <Dialog
              open={isQuestionModalOpen}
              onOpenChange={handleQuestionModalOpenChange}
            >
              <DialogContent className="sm:max-w-4xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-right">
                    {editingQuestionId ? "تعديل سؤال" : "إضافة سؤال"}
                  </DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={(event) => {
                    void saveQuestion(event);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="question-text">نص السؤال *</Label>
                    <Textarea
                      id="question-text"
                      value={questionTextValue}
                      onChange={(event) =>
                        setQuestionTextValue(event.target.value)
                      }
                      required
                      className="text-right bg-gray-100"
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label>اللعبة *</Label>
                      <Select
                        value={questionGameIdValue}
                        onValueChange={setQuestionGameIdValue}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر اللعبة" />
                        </SelectTrigger>
                        <SelectContent>
                          {(gamesQuery.data ?? []).map((game) => (
                            <SelectItem key={game.id} value={String(game.id)}>
                              {gameTitle(game)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>نوع السؤال *</Label>
                      <Select
                        value={questionType}
                        onValueChange={handleQuestionTypeChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mcq">mcq</SelectItem>
                          <SelectItem value="true_false">true_false</SelectItem>
                          <SelectItem value="fill_blank">fill_blank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="question-points">النقاط *</Label>
                      <Input
                        id="question-points"
                        type="number"
                        min={1}
                        value={questionPoints}
                        onChange={(event) =>
                          setQuestionPoints(event.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>المرحلة التعليمية (اختياري)</Label>
                      <Select
                        value={questionEducationLevelId || "none"}
                        onValueChange={handleQuestionEducationLevelChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المرحلة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">بدون تحديد</SelectItem>
                          {(educationLevelsQuery.data ?? []).map((level) => (
                            <SelectItem key={level.id} value={String(level.id)}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>الصف (اختياري)</Label>
                      <Select
                        value={questionStageId || "none"}
                        onValueChange={handleQuestionModalStageChange}
                        disabled={!questionEducationLevelId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الصف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">بدون تحديد</SelectItem>
                          {questionModalStageOptions.map((stage) => (
                            <SelectItem key={stage.id} value={String(stage.id)}>
                              {stage.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>المادة (اختياري)</Label>
                      <Select
                        value={questionSubjectId || "none"}
                        onValueChange={(value) => {
                          setQuestionSubjectId(value === "none" ? "" : value);
                          setQuestionDifficultyId("");
                        }}
                        disabled={!questionStageId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المادة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">بدون مادة</SelectItem>
                          {questionModalSubjectOptions.map((subject) => (
                            <SelectItem
                              key={subject.id}
                              value={String(subject.id)}
                            >
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>الصعوبة *</Label>
                      <Select
                        value={questionDifficultyId}
                        onValueChange={setQuestionDifficultyId}
                        disabled={!questionSubjectId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المستوى" />
                        </SelectTrigger>
                        <SelectContent>
                          {(questionModalDifficultyQuery.data ?? []).map(
                            (level) => (
                              <SelectItem
                                key={level.id}
                                value={String(level.id)}
                              >
                                {difficultyLabel(level)}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <label className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
                    <span className="text-sm text-gray-700">مفعلة</span>
                    <input
                      type="checkbox"
                      checked={questionIsActive}
                      onChange={(event) =>
                        setQuestionIsActive(event.target.checked)
                      }
                      className="h-4 w-4"
                    />
                  </label>

                  {questionType === "fill_blank" ? (
                    <div className="space-y-2">
                      <Label htmlFor="fill-blank-answer">
                        الإجابة الصحيحة *
                      </Label>
                      <Input
                        id="fill-blank-answer"
                        value={fillBlankAnswer}
                        onChange={(event) =>
                          setFillBlankAnswer(event.target.value)
                        }
                        placeholder="اكتب الإجابة الصحيحة"
                        className="text-right"
                        required
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>
                        {questionType === "true_false"
                          ? "اختيارات صح/خطأ"
                          : "الاختيارات"}
                      </Label>
                      {choiceTexts
                        .slice(0, questionType === "true_false" ? 2 : 4)
                        .map((choice, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={choice}
                              onChange={(event) => {
                                const next = [...choiceTexts];
                                next[index] = event.target.value;
                                setChoiceTexts(next);
                              }}
                              placeholder={
                                questionType === "true_false"
                                  ? index === 0
                                    ? "صح"
                                    : "خطأ"
                                  : `الخيار ${index + 1}`
                              }
                              className="text-right"
                            />
                            <label className="flex items-center gap-1 text-xs text-gray-600">
                              <input
                                type="radio"
                                checked={correctChoiceIndex === index}
                                onChange={() => setCorrectChoiceIndex(index)}
                              />
                              صحيح
                            </label>
                          </div>
                        ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={
                        !questionGameIdValue ||
                        !questionDifficultyId ||
                        (questionType === "fill_blank" &&
                          !fillBlankAnswer.trim())
                      }
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    >
                      {editingQuestionId ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      {editingQuestionId ? "حفظ التعديل" : "إضافة"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleQuestionModalOpenChange(false)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}

          <div className="space-y-3">
            {(questionsQuery.data ?? []).map((question) => {
              const qGameId = questionGameId(question);
              const game = qGameId ? gamesById.get(qGameId) : null;

              return (
                <div
                  key={question.id}
                  className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">
                        {questionText(question)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <Badge variant="outline">
                          {question.question_type ?? "-"}
                        </Badge>
                        <Badge variant="outline">
                          {(() => {
                            const difficultyId =
                              typeof question.difficulty_level_id === "number"
                                ? question.difficulty_level_id
                                : typeof question.difficulty_level === "number"
                                  ? question.difficulty_level
                                  : null;
                            const level =
                              difficultyId === null
                                ? null
                                : (allDifficultyLevelsQuery.data ?? []).find(
                                    (entry) => entry.id === difficultyId,
                                  );

                            if (level) {
                              return difficultyLabel(level);
                            }

                            if (typeof question.difficulty_level === "string") {
                              return question.difficulty_level;
                            }

                            return "-";
                          })()}
                        </Badge>
                        <Badge variant="outline">
                          {game ? gameTitle(game) : "بدون لعبة"}
                        </Badge>
                        <Badge
                          className={
                            question.is_active === false
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-100"
                              : "bg-green-100 text-green-700 hover:bg-green-100"
                          }
                        >
                          {question.is_active === false ? "غير مفعلة" : "مفعلة"}
                        </Badge>
                      </div>
                    </div>

                    {canManage && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditQuestion(question)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => {
                            void deleteQuestionMutation.mutateAsync({
                              id: question.id,
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "exams" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm grid gap-3 md:grid-cols-3">
            <Select
              value={examFilterEducationLevelId}
              onValueChange={handleExamFilterEducationLevelChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="المرحلة التعليمية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المراحل</SelectItem>
                {(educationLevelsQuery.data ?? []).map((level) => (
                  <SelectItem key={level.id} value={String(level.id)}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={examFilterStage}
              onValueChange={handleExamFilterStageChange}
              disabled={examFilterEducationLevelId === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="الصف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الصفوف</SelectItem>
                {examFilterStageOptions.map((stage) => (
                  <SelectItem key={stage.id} value={String(stage.id)}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={examFilterSubject}
              onValueChange={setExamFilterSubject}
              disabled={examFilterStage === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="المادة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المواد</SelectItem>
                {examFilterSubjectOptions.map((subject) => (
                  <SelectItem key={subject.id} value={String(subject.id)}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={examFilterDifficulty}
              onValueChange={setExamFilterDifficulty}
            >
              <SelectTrigger>
                <SelectValue placeholder="مستوى الصعوبة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المستويات</SelectItem>
                {(allDifficultyLevelsQuery.data ?? []).map((level) => (
                  <SelectItem key={level.id} value={String(level.id)}>
                    {difficultyLabel(level)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="سنة دراسية"
              value={examFilterYear === "all" ? "" : examFilterYear}
              onChange={(event) =>
                setExamFilterYear(event.target.value || "all")
              }
              className="text-right"
            />

            <Select
              value={examFilterActive}
              onValueChange={setExamFilterActive}
            >
              <SelectTrigger>
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="true">مفعلة</SelectItem>
                <SelectItem value="false">غير مفعلة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {canManage && (
            <Dialog
              open={isExamModalOpen}
              onOpenChange={handleExamModalOpenChange}
            >
              <DialogContent className="sm:max-w-3xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-right">
                    {editingExamId ? "تعديل اختبار" : "إضافة اختبار"}
                  </DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={(event) => {
                    void saveExam(event);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="exam-title">اسم الاختبار *</Label>
                    <Input
                      id="exam-title"
                      value={examTitleValue}
                      onChange={(event) =>
                        setExamTitleValue(event.target.value)
                      }
                      required
                      className="text-right"
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>المرحلة التعليمية</Label>
                      <Select
                        value={examEducationLevelId || "none"}
                        onValueChange={handleExamEducationLevelChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المرحلة التعليمية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">
                            اختر المرحلة التعليمية
                          </SelectItem>
                          {(educationLevelsQuery.data ?? []).map((level) => (
                            <SelectItem key={level.id} value={String(level.id)}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>الصف</Label>
                      <Select
                        value={examStageId || "none"}
                        onValueChange={handleExamModalStageChange}
                        disabled={!examEducationLevelId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الصف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">اختر الصف</SelectItem>
                          {examModalStageOptions.map((stage) => (
                            <SelectItem key={stage.id} value={String(stage.id)}>
                              {stage.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>المادة (اختياري)</Label>
                      <Select
                        value={examSubjectId || "none"}
                        onValueChange={(value) => {
                          const nextSubjectId = value === "none" ? "" : value;
                          setExamSubjectId(nextSubjectId);
                          if (!nextSubjectId) {
                            setExamDifficultyId("");
                          }
                        }}
                        disabled={!examStageId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المادة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">بدون مادة</SelectItem>
                          {examModalSubjectOptions.map((subject) => (
                            <SelectItem
                              key={subject.id}
                              value={String(subject.id)}
                            >
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>مستوى الصعوبة (اختياري)</Label>
                      <Select
                        value={examDifficultyId || "none"}
                        onValueChange={(value) =>
                          setExamDifficultyId(value === "none" ? "" : value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="مستوى الصعوبة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">بدون مستوى</SelectItem>
                          {examDifficultyOptions.map((level) => (
                            <SelectItem key={level.id} value={String(level.id)}>
                              {difficultyLabel(level)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exam-education-year">
                        السنة الدراسية
                      </Label>
                      <Input
                        placeholder="education year"
                        value={examEducationYear}
                        onChange={(event) =>
                          setExamEducationYear(event.target.value)
                        }
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exam-duration-minutes">
                        مدة الامتحان (بالدقائق)
                      </Label>
                      <Input
                        placeholder="duration_minutes"
                        type="number"
                        min={1}
                        value={examDurationMinutes}
                        onChange={(event) =>
                          setExamDurationMinutes(event.target.value)
                        }
                        className="text-right"
                      />
                    </div>
                  </div>

                  <label className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
                    <span className="text-sm text-gray-700">مفعلة</span>
                    <input
                      type="checkbox"
                      checked={examIsActive}
                      onChange={(event) =>
                        setExamIsActive(event.target.checked)
                      }
                      className="h-4 w-4"
                    />
                  </label>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    >
                      {editingExamId ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      {editingExamId ? "حفظ التعديل" : "إضافة"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleExamModalOpenChange(false)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}

          <Dialog
            open={isQuestionPickerOpen}
            onOpenChange={(open) => {
              setIsQuestionPickerOpen(open);
              if (!open) {
                setPickerEduLevelId("");
                setPickerStageId("");
                setPickerSubjectId("");
                setPickerGameId("all");
                setPickerDifficultyId("all");
                setPickerSelectedIds(new Set());
                setSelectedExamIdForDetail(null);
              }
            }}
          >
            <DialogContent className="sm:max-w-4xl" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-right">
                  {examDetailQuery.data
                    ? `أسئلة: ${examTitle(examDetailQuery.data)}`
                    : "استعراض وإضافة أسئلة للاختبار"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {examDetailQuestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      أسئلة الاختبار الحالية ({examDetailQuestions.length})
                    </p>
                    <div className="max-h-40 overflow-y-auto space-y-1 rounded-lg border p-2">
                      {examDetailQuestions.map((ref, index) => {
                        const eqId = examQuestionEqId(ref);
                        return (
                          <div
                            key={`${eqId ?? "q"}-${index}`}
                            className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 hover:bg-gray-50"
                          >
                            <p className="text-sm text-gray-700 min-w-0 truncate">
                              {examQuestionText(ref)}
                            </p>
                            {canManage && eqId && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="shrink-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() => {
                                  if (!selectedExamIdForDetail) return;
                                  void removeExamQuestionMutation.mutateAsync({
                                    id: selectedExamIdForDetail,
                                    eqId,
                                  });
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <p className="text-sm font-medium text-gray-700">
                  استعراض الأسئلة وإضافة للاختبار
                </p>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  <Select
                    value={pickerEduLevelId || "all"}
                    onValueChange={(value) => {
                      const next = value === "all" ? "" : value;
                      setPickerEduLevelId(next);
                      setPickerStageId("");
                      setPickerSubjectId("");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="المرحلة التعليمية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل المراحل</SelectItem>
                      {(educationLevelsQuery.data ?? []).map((level) => (
                        <SelectItem key={level.id} value={String(level.id)}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={pickerStageId || "all"}
                    onValueChange={(value) => {
                      const next = value === "all" ? "" : value;
                      setPickerStageId(next);
                      setPickerSubjectId("");
                    }}
                    disabled={!pickerEduLevelId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="الصف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الصفوف</SelectItem>
                      {pickerStageOptions.map((stage) => (
                        <SelectItem key={stage.id} value={String(stage.id)}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={pickerSubjectId || "all"}
                    onValueChange={(value) =>
                      setPickerSubjectId(value === "all" ? "" : value)
                    }
                    disabled={!pickerStageId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="المادة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل المواد</SelectItem>
                      {pickerSubjectOptions.map((subject) => (
                        <SelectItem key={subject.id} value={String(subject.id)}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={pickerGameId} onValueChange={setPickerGameId}>
                    <SelectTrigger>
                      <SelectValue placeholder="اللعبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الألعاب</SelectItem>
                      {(gamesQuery.data ?? []).map((game) => (
                        <SelectItem key={game.id} value={String(game.id)}>
                          {gameTitle(game)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={pickerDifficultyId}
                    onValueChange={setPickerDifficultyId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="مستوى الصعوبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل المستويات</SelectItem>
                      {(allDifficultyLevelsQuery.data ?? []).map((level) => (
                        <SelectItem key={level.id} value={String(level.id)}>
                          {difficultyLabel(level)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="max-h-96 overflow-y-auto space-y-2 rounded-lg border p-3">
                  {pickerQuestionsQuery.isLoading && (
                    <p className="py-4 text-center text-sm text-gray-500">
                      جاري التحميل...
                    </p>
                  )}
                  {!pickerQuestionsQuery.isLoading &&
                    (pickerQuestionsQuery.data ?? []).length === 0 && (
                      <p className="py-4 text-center text-sm text-gray-500">
                        لا توجد أسئلة.
                      </p>
                    )}
                  {(pickerQuestionsQuery.data ?? []).map((question) => {
                    const isSelected = pickerSelectedIds.has(question.id);
                    return (
                      <label
                        key={question.id}
                        className="flex cursor-pointer items-start gap-3 rounded-md border border-gray-200 px-3 py-2 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            setPickerSelectedIds((prev) => {
                              const next = new Set(prev);
                              if (isSelected) {
                                next.delete(question.id);
                              } else {
                                next.add(question.id);
                              }
                              return next;
                            });
                          }}
                          className="mt-0.5 h-4 w-4 shrink-0"
                        />
                        <div className="min-w-0 space-y-1">
                          <p className="text-sm text-gray-900">
                            {questionText(question)}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                              {question.question_type ?? "-"}
                            </Badge>
                            {(() => {
                              const diffId =
                                typeof question.difficulty_level_id === "number"
                                  ? question.difficulty_level_id
                                  : typeof question.difficulty_level ===
                                      "number"
                                    ? question.difficulty_level
                                    : null;
                              const lvl =
                                diffId !== null
                                  ? difficultyLevelById.get(diffId)
                                  : null;
                              return lvl ? (
                                <Badge variant="outline" className="text-xs">
                                  {difficultyLabel(lvl)}
                                </Badge>
                              ) : null;
                            })()}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    {pickerSelectedIds.size > 0
                      ? `${pickerSelectedIds.size} سؤال محدد`
                      : "لم يتم تحديد أسئلة"}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsQuestionPickerOpen(false)}
                    >
                      إلغاء
                    </Button>
                    <Button
                      type="button"
                      disabled={pickerSelectedIds.size === 0}
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                      onClick={() => void addSelectedQuestionsToExam()}
                    >
                      <Plus className="w-4 h-4" />
                      إضافة المحدد ({pickerSelectedIds.size})
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="space-y-3">
            {(examsQuery.data ?? []).map((exam) => (
              <div
                key={exam.id}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900">
                      {examTitle(exam)}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      {(() => {
                        const subjectId = getExamSubjectId(exam);
                        const numericSubjectId =
                          typeof subjectId === "number"
                            ? subjectId
                            : subjectId
                              ? Number(subjectId)
                              : null;
                        const subjectName =
                          numericSubjectId !== null
                            ? subjectLabelById.get(numericSubjectId)
                            : null;
                        return (
                          <Badge variant="outline">
                            المادة:{" "}
                            {subjectName ??
                              (subjectId !== null ? String(subjectId) : "-")}
                          </Badge>
                        );
                      })()}
                      {(() => {
                        const stageId = getExamStageId(exam);
                        const numericStageId =
                          typeof stageId === "number"
                            ? stageId
                            : stageId
                              ? Number(stageId)
                              : null;
                        const stage =
                          numericStageId !== null
                            ? educationStagesById.get(numericStageId)
                            : null;
                        return (
                          <Badge variant="outline">
                            الصف:{" "}
                            {stage
                              ? stage.name
                              : stageId !== null
                                ? String(stageId)
                                : "-"}
                          </Badge>
                        );
                      })()}
                      {(() => {
                        const diffId = getExamDifficultyLevelId(exam);
                        const numericDiffId =
                          typeof diffId === "number"
                            ? diffId
                            : diffId
                              ? Number(diffId)
                              : null;
                        const diff =
                          numericDiffId !== null
                            ? difficultyLevelById.get(numericDiffId)
                            : null;
                        return (
                          <Badge variant="outline">
                            الصعوبة:{" "}
                            {diff
                              ? difficultyLabel(diff)
                              : diffId !== null
                                ? String(diffId)
                                : "-"}
                          </Badge>
                        );
                      })()}
                      <Badge variant="outline">
                        السنة: {exam.education_year ?? "-"}
                      </Badge>
                      <Badge variant="outline">
                        المدة: {exam.duration_minutes ?? "-"} دقيقة
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedExamIdForDetail(exam.id);
                        setIsQuestionPickerOpen(true);
                      }}
                    >
                      الأسئلة
                    </Button>
                    {canManage && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditExam(exam)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => {
                            void deleteExamMutation.mutateAsync({
                              id: exam.id,
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "difficulty-levels" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm grid gap-3 md:grid-cols-3">
            <Select
              value={difficultyFilterEducationLevelId}
              onValueChange={handleDifficultyFilterEducationLevelChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="المرحلة التعليمية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المراحل</SelectItem>
                {(educationLevelsQuery.data ?? []).map((level) => (
                  <SelectItem key={level.id} value={String(level.id)}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={difficultyFilterStageId}
              onValueChange={handleDifficultyFilterStageChange}
              disabled={difficultyFilterEducationLevelId === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="الصف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الصفوف</SelectItem>
                {difficultyFilterStageOptions.map((stage) => (
                  <SelectItem key={stage.id} value={String(stage.id)}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={difficultyFilterSubject}
              onValueChange={setDifficultyFilterSubject}
              disabled={difficultyFilterStageId === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="فلتر حسب المادة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المواد</SelectItem>
                {difficultyFilterSubjectOptions.map((subject) => (
                  <SelectItem key={subject.id} value={String(subject.id)}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {canManage && (
            <Dialog
              open={isDifficultyModalOpen}
              onOpenChange={handleDifficultyModalOpenChange}
            >
              <DialogContent className="sm:max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-right">
                    {editingDifficultyId
                      ? "تعديل مستوى صعوبة"
                      : "إضافة مستوى صعوبة"}
                  </DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={(event) => {
                    void saveDifficulty(event);
                  }}
                  className="space-y-4"
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    <Select
                      value={difficultyLevel}
                      onValueChange={setDifficultyLevel}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="مستوى الصعوبة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">easy</SelectItem>
                        <SelectItem value="medium">medium</SelectItem>
                        <SelectItem value="hard">hard</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={difficultyEducationLevelId || "none"}
                      onValueChange={handleDifficultyEducationLevelChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="المرحلة التعليمية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          اختر المرحلة التعليمية
                        </SelectItem>
                        {(educationLevelsQuery.data ?? []).map((level) => (
                          <SelectItem key={level.id} value={String(level.id)}>
                            {level.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={difficultyStageId || "none"}
                      onValueChange={handleDifficultyStageChange}
                      disabled={!difficultyEducationLevelId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="الصف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">اختر الصف</SelectItem>
                        {difficultyModalStageOptions.map((stage) => (
                          <SelectItem key={stage.id} value={String(stage.id)}>
                            {stage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={difficultySubjectId || "none"}
                      onValueChange={(value) =>
                        setDifficultySubjectId(value === "none" ? "" : value)
                      }
                      disabled={!difficultyStageId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="المادة (اختياري)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">بدون مادة</SelectItem>
                        {difficultyModalSubjectOptions.map((subject) => (
                          <SelectItem
                            key={subject.id}
                            value={String(subject.id)}
                          >
                            {subject.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="description (اختياري)"
                    value={difficultyDescription}
                    onChange={(event) =>
                      setDifficultyDescription(event.target.value)
                    }
                    className="text-right bg-gray-100"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    >
                      {editingDifficultyId ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      {editingDifficultyId ? "حفظ التعديل" : "إضافة"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDifficultyModalOpenChange(false)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}

          <div className="space-y-3">
            {(difficultyLevelsQuery.data ?? []).map((level) => (
              <div
                key={level.id}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">
                      {difficultyLabel(level)}
                    </p>
                    <p className="text-xs text-gray-600">
                      subject:{" "}
                      {(() => {
                        const subjectId = getDifficultySubjectId(level);
                        if (subjectId === null) {
                          return "-";
                        }

                        return (
                          subjectLabelById.get(subjectId) ??
                          `Subject #${subjectId}`
                        );
                      })()}
                    </p>
                    <p className="text-xs text-gray-600">
                      {level.description ?? "-"}
                    </p>
                  </div>

                  {canManage && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditDifficulty(level)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => {
                          void deleteDifficultyMutation.mutateAsync({
                            id: level.id,
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
